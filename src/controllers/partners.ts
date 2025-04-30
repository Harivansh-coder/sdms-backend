import prisma from "@/src/utils/database";
import { Request, Response } from "express";

export const getPartnerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const partner = await prisma.deliveryPartner.findMany({
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
  } catch (error) {
    console.error("Error fetching partner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPartnerController = async (req: Request, res: Response) => {
  const deliveryPartner = req.body;
  try {
    // Check if the partner already exists
    const existingPartner = await prisma.deliveryPartner.findUnique({
      where: { email: deliveryPartner.email },
    });
    if (existingPartner) {
      res.status(409).json({ message: "Partner already exists" });
      return;
    }

    const newPartner = await prisma.deliveryPartner.create({
      data: {
        ...deliveryPartner,
      },
    });
    res.status(201).json(newPartner);
  } catch (error) {
    console.error("Error creating partner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePartnerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedPartnerPayload = req.body;

  try {
    // Check if the partner exists
    const existingPartner = await prisma.deliveryPartner.findUnique({
      where: { id: id },
    });

    if (!existingPartner) {
      res.status(404).json({ message: "Partner not found" });
      return;
    }

    const updatedPartner = await prisma.deliveryPartner.update({
      where: { id: id },
      data: {
        ...updatedPartnerPayload,
      },
    });
    res.status(200).json(updatedPartner);
  } catch (error) {
    console.error("Error updating partner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePartnerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Check if the partner exists
    const existingPartner = await prisma.deliveryPartner.findUnique({
      where: { id: id },
    });

    if (!existingPartner) {
      res.status(404).json({ message: "Partner not found" });
      return;
    }

    await prisma.deliveryPartner.delete({
      where: { id: id },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting partner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
