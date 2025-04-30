"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const validate_1 = __importDefault(require("../middleware/validate"));
const order_1 = require("../schema/order");
const auth_1 = require("../middleware/auth");
const ordersRouter = (0, express_1.Router)();
ordersRouter.get("/", auth_1.verifyAccessToken, orders_1.getOrdersController);
ordersRouter.get("/:id", auth_1.verifyAccessToken, orders_1.getOrdersController);
ordersRouter.post("/", auth_1.verifyAccessToken, (0, validate_1.default)(order_1.orderSchema), orders_1.createOrdersController);
ordersRouter.put("/:id", auth_1.verifyAccessToken, (0, validate_1.default)(order_1.orderUpdateSchema), orders_1.updateOrdersController);
ordersRouter.delete("/:id", auth_1.verifyAccessToken, orders_1.deleteOrdersController);
exports.default = ordersRouter;
