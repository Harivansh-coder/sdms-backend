"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assignments_1 = require("@/src/controllers/assignments");
const auth_1 = require("../middleware/auth");
const validate_1 = __importDefault(require("../middleware/validate"));
const assignment_1 = require("../schema/assignment");
const assignmentsRouter = (0, express_1.Router)();
assignmentsRouter.get("/", auth_1.verifyAccessToken, assignments_1.getAssignmentsController);
assignmentsRouter.get("/metrics", auth_1.verifyAccessToken, assignments_1.getAssignmentsMetricsController);
assignmentsRouter.get("/:id", auth_1.verifyAccessToken, assignments_1.getAssignmentsController);
assignmentsRouter.post("/run", auth_1.verifyAccessToken, (0, validate_1.default)(assignment_1.assignmentSchema), assignments_1.createAssignmentsController);
assignmentsRouter.put("/:id", auth_1.verifyAccessToken, (0, validate_1.default)(assignment_1.assignmentUpdateSchema), assignments_1.updateAssignmentsController);
assignmentsRouter.delete("/:id", auth_1.verifyAccessToken, assignments_1.deleteAssignmentsController);
exports.default = assignmentsRouter;
