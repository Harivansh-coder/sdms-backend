import { Router } from "express";
import {
  getAssignmentsController,
  createAssignmentsController,
  deleteAssignmentsController,
  getAssignmentsMetricsController,
  updateAssignmentsController,
} from "../controllers/assignments";
import { verifyAccessToken } from "../middleware/auth";
import validateRequestBody from "../middleware/validate";
import { assignmentSchema, assignmentUpdateSchema } from "../schema/assignment";

const assignmentsRouter = Router();

assignmentsRouter.get("/", verifyAccessToken, getAssignmentsController);
assignmentsRouter.get(
  "/metrics",
  verifyAccessToken,
  getAssignmentsMetricsController
);
assignmentsRouter.get("/:id", verifyAccessToken, getAssignmentsController);
assignmentsRouter.post(
  "/run",
  verifyAccessToken,
  validateRequestBody(assignmentSchema),
  createAssignmentsController
);
assignmentsRouter.put(
  "/:id",
  verifyAccessToken,
  validateRequestBody(assignmentUpdateSchema),
  updateAssignmentsController
);
assignmentsRouter.delete(
  "/:id",
  verifyAccessToken,
  deleteAssignmentsController
);

export default assignmentsRouter;
