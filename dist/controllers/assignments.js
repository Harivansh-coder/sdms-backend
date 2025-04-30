"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignmentsMetricsController = exports.deleteAssignmentsController = exports.updateAssignmentsController = exports.createAssignmentsController = exports.getAssignmentsController = void 0;
const database_1 = __importDefault(require("../utils/database"));
const dayjs_1 = __importDefault(require("dayjs"));
const getAssignmentsController = async (req, res) => {
    const { id } = req.params;
    try {
        // if the id is null, it will return all assignments
        const assignments = await database_1.default.assignment.findMany({
            where: {
                id: id ? id : undefined,
            },
        });
        if (assignments.length === 0) {
            res.status(404).json({
                status: "error",
                message: "no assignments found",
            });
            return;
        }
        // if the id is not null, it will return the assignment with the given id
        if (id) {
            res.status(200).json({
                status: "success",
                message: "Assignment retrieved successfully",
                data: assignments[0],
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "Assignments retrieved successfully",
            data: assignments,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
exports.getAssignmentsController = getAssignmentsController;
const createAssignmentsController = async (req, res) => {
    const assignmentPayload = req.body;
    // check if the assignment already exists
    const existingAssignment = await database_1.default.assignment.findFirst({
        where: {
            orderId: assignmentPayload.orderId,
            partnerId: assignmentPayload.partnerId,
        },
    });
    if (existingAssignment) {
        res.status(400).json({
            status: "error",
            message: "Assignment already exists",
        });
        return;
    }
    // check if the orderId and partnerId are valid
    const order = await database_1.default.order.findUnique({
        where: {
            id: assignmentPayload.orderId,
        },
    });
    if (!order) {
        res.status(400).json({
            status: "error",
            message: "Order not found",
        });
        return;
    }
    const partner = await database_1.default.deliveryPartner.findUnique({
        where: {
            id: assignmentPayload.partnerId,
        },
    });
    if (!partner) {
        res.status(400).json({
            status: "error",
            message: "Partner not found",
        });
        return;
    }
    try {
        const newAssignment = await database_1.default.assignment.create({
            data: {
                ...assignmentPayload,
            },
        });
        res.status(201).json({
            status: "success",
            message: "Assignment created successfully",
            data: newAssignment,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
exports.createAssignmentsController = createAssignmentsController;
const updateAssignmentsController = async (req, res) => {
    const { id } = req.params;
    const updatedAssignementPayload = req.body;
    // check if the assignment exists
    const existingAssignment = await database_1.default.assignment.findUnique({
        where: {
            id: id,
        },
    });
    if (!existingAssignment) {
        res.status(404).json({
            status: "error",
            message: "Assignment not found",
        });
    }
    // check if the orderId and partnerId are valid
    const order = await database_1.default.order.findUnique({
        where: {
            id: updatedAssignementPayload.orderId,
        },
    });
    if (!order) {
        res.status(400).json({
            status: "error",
            message: "Order not found",
        });
        return;
    }
    const partner = await database_1.default.deliveryPartner.findUnique({
        where: {
            id: updatedAssignementPayload.partnerId,
        },
    });
    if (!partner) {
        res.status(400).json({
            status: "error",
            message: "Partner not found",
        });
        return;
    }
    try {
        const updatedAssignment = await database_1.default.assignment.update({
            where: {
                id: id,
            },
            data: {
                ...updatedAssignementPayload,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Assignment updated successfully",
            data: updatedAssignment,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
exports.updateAssignmentsController = updateAssignmentsController;
const deleteAssignmentsController = async (req, res) => {
    const { id } = req.params;
    try {
        await database_1.default.assignment.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json({
            status: "success",
            message: "Assignment deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
exports.deleteAssignmentsController = deleteAssignmentsController;
const getAssignmentsMetricsController = async (req, res) => {
    try {
        // 1. Assignment Trends by day (Mon-Sun)
        const rawTrends = await database_1.default.assignment.findMany({
            where: {
                assignedAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)), // last 7 days
                },
            },
            select: {
                assignedAt: true,
            },
        });
        const trendMap = new Map();
        for (const row of rawTrends) {
            const day = (0, dayjs_1.default)(row.assignedAt).format("ddd"); // 'Mon', 'Tue', etc.
            trendMap.set(day, (trendMap.get(day) || 0) + 1);
        }
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const assignmentTrends = days.map((day) => ({
            name: day,
            assignments: trendMap.get(day) || 0,
        }));
        // 2. Assignment Metrics
        const totalAssigned = await database_1.default.assignment.count();
        const successfulAssignments = await database_1.default.order.count({
            where: {
                status: "COMPLETED",
                assignedAt: { not: null },
                deliveredAt: { not: null },
            },
        });
        const successfulOrders = await database_1.default.order.findMany({
            where: {
                status: "COMPLETED",
                assignedAt: { not: null },
                deliveredAt: { not: null },
            },
            select: {
                assignedAt: true,
                deliveredAt: true,
            },
        });
        const deliveryTimesInMinutes = successfulOrders.map((order) => (new Date(order.deliveredAt).getTime() -
            new Date(order.assignedAt).getTime()) /
            (1000 * 60));
        const averageDeliveryTime = deliveryTimesInMinutes.length > 0
            ? `${Math.round(deliveryTimesInMinutes.reduce((a, b) => a + b, 0) /
                deliveryTimesInMinutes.length)} mins`
            : "0 mins";
        // 3. Failure reasons count (from rejected assignments)
        const failureReasonGroups = await database_1.default.assignment.groupBy({
            by: ["reason"],
            where: {
                status: "REJECTED",
                reason: { not: null },
            },
            _count: {
                reason: true,
            },
        });
        const failureReasons = failureReasonGroups.map((r) => ({
            reason: r.reason ?? "Unknown",
            count: r._count.reason,
        }));
        // 4. Partner Metrics (from Metrics model)
        const partnerCount = await database_1.default.deliveryPartner.count({
            where: {
                status: "ACTIVE",
            },
        });
        const ratingStats = await database_1.default.metrics.aggregate({
            _avg: {
                rating: true,
            },
        });
        const areaStats = await database_1.default.deliveryPartner.findMany({
            where: {
                NOT: {
                    areas: {},
                },
            },
            select: {
                areas: true,
            },
        });
        const areaFrequency = {};
        areaStats.forEach((partner) => {
            const areas = Array.isArray(partner.areas)
                ? partner.areas
                : JSON.parse(partner.areas);
            areas.forEach((area) => {
                areaFrequency[area] = (areaFrequency[area] || 0) + 1;
            });
        });
        const topAreas = Object.entries(areaFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([area]) => area);
        // 5. Partner availability counts
        const statusCounts = await database_1.default.deliveryPartner.groupBy({
            by: ["status"],
            _count: {
                status: true,
            },
        });
        const availabilityMap = Object.fromEntries(statusCounts.map((r) => [r.status.toLowerCase(), r._count.status]));
        const partnerAvailability = {
            available: availabilityMap["active"] ?? 0,
            busy: 0, // If you have busy tracking logic (e.g., currentLoad > 0), compute it here
            offline: availabilityMap["inactive"] ?? 0,
        };
        // Final Response
        res.status(200).json({
            status: "success",
            message: "Assignment metrics retrieved successfully",
            data: {
                assignmentTrends,
                assignmentMetrics: {
                    totalAssigned,
                    successRate: totalAssigned > 0
                        ? Math.round((successfulAssignments / totalAssigned) * 100)
                        : 0,
                    averageDeliveryTime,
                    failureReasons,
                },
                partnersMetrics: {
                    totalActive: partnerCount,
                    avgRating: parseFloat((ratingStats._avg.rating ?? 0).toFixed(2)),
                    topAreas,
                },
                partnerAvailability,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
exports.getAssignmentsMetricsController = getAssignmentsMetricsController;
