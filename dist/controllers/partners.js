"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePartnerController = exports.updatePartnerController = exports.createPartnerController = exports.getPartnerController = void 0;
const database_1 = __importDefault(require("../utils/database"));
const getPartnerController = async (req, res) => {
    const { id } = req.params;
    try {
        const partner = await database_1.default.deliveryPartner.findMany({
            where: { id: id ? id : undefined },
        });
        if (partner.length === 0) {
            res.status(404).json({ message: "No partner found" });
            return;
        }
        if (id) {
            const singlePartner = partner[0];
            res.status(200).json(singlePartner);
            return;
        }
        res.status(200).json(partner);
    }
    catch (error) {
        console.error("Error fetching partner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getPartnerController = getPartnerController;
const createPartnerController = async (req, res) => {
    const deliveryPartner = req.body;
    try {
        // Check if the partner already exists
        const existingPartner = await database_1.default.deliveryPartner.findUnique({
            where: { email: deliveryPartner.email },
        });
        if (existingPartner) {
            res.status(409).json({ message: "Partner already exists" });
            return;
        }
        const newPartner = await database_1.default.deliveryPartner.create({
            data: {
                ...deliveryPartner,
            },
        });
        res.status(201).json(newPartner);
    }
    catch (error) {
        console.error("Error creating partner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createPartnerController = createPartnerController;
const updatePartnerController = async (req, res) => {
    const { id } = req.params;
    const updatedPartnerPayload = req.body;
    try {
        // Check if the partner exists
        const existingPartner = await database_1.default.deliveryPartner.findUnique({
            where: { id: id },
        });
        if (!existingPartner) {
            res.status(404).json({ message: "Partner not found" });
            return;
        }
        const updatedPartner = await database_1.default.deliveryPartner.update({
            where: { id: id },
            data: {
                ...updatedPartnerPayload,
            },
        });
        res.status(200).json(updatedPartner);
    }
    catch (error) {
        console.error("Error updating partner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updatePartnerController = updatePartnerController;
const deletePartnerController = async (req, res) => {
    const { id } = req.params;
    try {
        // Check if the partner exists
        const existingPartner = await database_1.default.deliveryPartner.findUnique({
            where: { id: id },
        });
        if (!existingPartner) {
            res.status(404).json({ message: "Partner not found" });
            return;
        }
        await database_1.default.deliveryPartner.delete({
            where: { id: id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting partner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deletePartnerController = deletePartnerController;
