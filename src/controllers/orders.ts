import prisma from "@/src/utils/database";

export const getOrdersController = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await prisma.orders.findMany({
      where: {
        id: id ? parseInt(id) : undefined,
      },
    });
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createOrdersController = async (req, res) => {
  const { orderData } = req.body;
  try {
    const newOrder = await prisma.orders.create({
      data: orderData,
    });
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrdersController = async (req, res) => {
  const { id } = req.params;
  const { orderData } = req.body;
  try {
    const updatedOrder = await prisma.orders.update({
      where: { id: parseInt(id) },
      data: orderData,
    });
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteOrdersController = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.orders.delete({
      where: { id: parseInt(id) },
    });
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
