import { Router } from "express";
import {
  getAssignmentsController,
  createAssignmentsController,
  deleteAssignmentsController,
  getAssignmentsMetricsController,
  updateAssignmentsController,
} from "@/src/controllers/assignments";

const assignmentsRouter = Router();

// if the id is null, it will return all assignmentss
assignmentsRouter.get("/:id", getAssignmentsController);
assignmentsRouter.post("/run", createAssignmentsController);
assignmentsRouter.put("/:id", updateAssignmentsController);
assignmentsRouter.delete("/:id", deleteAssignmentsController);
assignmentsRouter.get("/metrics", getAssignmentsMetricsController);

export default assignmentsRouter;
