import { Router } from "express";
import {
  createPartnerController,
  deletePartnerController,
  getPartnerController,
  updatePartnerController,
} from "@/src/controllers/partners";
import { verifyAccessToken } from "../middleware/auth";
import validateRequestBody from "../middleware/validate";
import { partnerSchema, partnerUpdateSchema } from "../schema/partner";

const partnerRouter = Router();

partnerRouter.get("/", verifyAccessToken, getPartnerController);
partnerRouter.get("/:id", verifyAccessToken, getPartnerController);
partnerRouter.post(
  "/",
  verifyAccessToken,
  validateRequestBody(partnerSchema),
  createPartnerController
);
partnerRouter.put(
  "/:id",
  verifyAccessToken,
  validateRequestBody(partnerUpdateSchema),
  updatePartnerController
);
partnerRouter.delete("/:id", verifyAccessToken, deletePartnerController);

export default partnerRouter;
