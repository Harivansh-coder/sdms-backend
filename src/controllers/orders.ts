import prisma from "../utils/database";
import { Request, Response } from "express";

export const getOrdersController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const orders = await prisma.order.findMany({
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
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createOrdersController = async (req: Request, res: Response) => {
  const orderData = req.body;
  try {
    const newOrder = await prisma.order.create({
      data: {
        ...orderData,
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrdersController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const orderData = req.body;
  try {
    // check if id is null or undefined
    if (!id) {
      res.status(400).json({ message: "Order ID is required" });
      return;
    }

    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: {
        ...orderData,
      },
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteOrdersController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // check if id is null or undefined
    if (!id) {
      res.status(400).json({ message: "Order ID is required" });
      return;
    }

    const order = await prisma.order.findFirst({
      where: { id: id },
    });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    await prisma.order.delete({
      where: { id: id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
