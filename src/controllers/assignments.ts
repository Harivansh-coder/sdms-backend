import prisma from "@/src/utils/database";
import { Request, Response } from "express";

export const getAssignmentsController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // if the id is null, it will return all assignments
    const assignments = await prisma.assignments.findMany({
      where: {
        id: id ? parseInt(id) : undefined,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Assignments retrieved successfully",
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const createAssignmentsController = async (
  req: Request,
  res: Response
) => {
  const { name, description } = req.body;

  try {
    const newAssignment = await prisma.assignments.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Assignment created successfully",
      data: newAssignment,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const updateAssignmentsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedAssignment = await prisma.assignments.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Assignment updated successfully",
      data: updatedAssignment,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const deleteAssignmentsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    await prisma.assignments.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      status: "success",
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getAssignmentsMetricsController = async (
  req: Request,
  res: Response
) => {
  try {
    const totalAssignments = await prisma.assignments.count();

    res.status(200).json({
      status: "success",
      message: "Assignments metrics retrieved successfully",
      data: {
        totalAssignments,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
