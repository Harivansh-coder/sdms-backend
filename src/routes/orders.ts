import { Router } from "express";
import {
  createOrdersController,
  deleteOrdersController,
  getOrdersController,
  updateOrdersController,
} from "@/src/controllers/orders";
import validateRequestBody from "../middleware/validate";
import { orderSchema, orderUpdateSchema } from "../schema/order";
import { verifyAccessToken } from "../middleware/auth";

const ordersRouter = Router();

ordersRouter.get("/", verifyAccessToken, getOrdersController);
ordersRouter.get("/:id", verifyAccessToken, getOrdersController);
ordersRouter.post(
  "/",
  verifyAccessToken,
  validateRequestBody(orderSchema),
  createOrdersController
);
ordersRouter.put(
  "/:id",
  verifyAccessToken,
  validateRequestBody(orderUpdateSchema),
  updateOrdersController
);
ordersRouter.delete("/:id", verifyAccessToken, deleteOrdersController);

export default ordersRouter;
