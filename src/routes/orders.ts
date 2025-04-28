import { Router } from "express";
import {
  createOrdersController,
  deleteOrdersController,
  getOrdersController,
  updateOrdersController,
} from "@/src/controllers/orders";

const ordersRouter = Router();

// if the id is null, it will return all orderss
ordersRouter.get("/:id", getOrdersController);
ordersRouter.post("/", createOrdersController);
ordersRouter.put("/:id", updateOrdersController);
ordersRouter.delete("/:id", deleteOrdersController);

export default ordersRouter;
