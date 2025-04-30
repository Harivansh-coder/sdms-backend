"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrdersController = exports.updateOrdersController = exports.createOrdersController = exports.getOrdersController = void 0;
const database_1 = __importDefault(require("../utils/database"));
const getOrdersController = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await database_1.default.order.findMany({
            where: {
                id: id ? id : undefined,
            },
        });
        if (orders.length === 0) {
            res.status(404).json({ message: "No orders found" });
            return;
        }
        if (id) {
            res.status(200).json(orders[0]);
            return;
        }
        // If id is not provided, return all orders
        res.status(200).json(orders);
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getOrdersController = getOrdersController;
const createOrdersController = async (req, res) => {
    const orderData = req.body;
    try {
        const newOrder = await database_1.default.order.create({
            data: {
                ...orderData,
            },
        });
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createOrdersController = createOrdersController;
const updateOrdersController = async (req, res) => {
    const { id } = req.params;
    const orderData = req.body;
    try {
        // check if id is null or undefined
        if (!id) {
            res.status(400).json({ message: "Order ID is required" });
            return;
        }
        const updatedOrder = await database_1.default.order.update({
            where: { id: id },
            data: {
                ...orderData,
            },
        });
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateOrdersController = updateOrdersController;
const deleteOrdersController = async (req, res) => {
    const { id } = req.params;
    try {
        // check if id is null or undefined
        if (!id) {
            res.status(400).json({ message: "Order ID is required" });
            return;
        }
        const order = await database_1.default.order.findFirst({
            where: { id: id },
        });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        await database_1.default.order.delete({
            where: { id: id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteOrdersController = deleteOrdersController;
