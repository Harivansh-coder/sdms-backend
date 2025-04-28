import prisma from "@/src/utils/database";

export const getPartnerController = async (req, res) => {
  const { id } = req.params;
  try {
    const partner = await prisma.partner.findMany({
      where: { id: id ? parseInt(id) : undefined },
    });

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    return res.status(200).json(partner);
  } catch (error) {
    console.error("Error fetching partner:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createPartnerController = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newPartner = await prisma.partner.create({
      data: { name, email, phone },
    });
    return res.status(201).json(newPartner);
  } catch (error) {
    console.error("Error creating partner:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePartnerController = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const updatedPartner = await prisma.partner.update({
      where: { id: parseInt(id) },
      data: { name, email, phone },
    });
    return res.status(200).json(updatedPartner);
  } catch (error) {
    console.error("Error updating partner:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePartnerController = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.partner.delete({
      where: { id: parseInt(id) },
    });
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting partner:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
