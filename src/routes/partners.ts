import { Router } from "express";
import {
  createPartnerController,
  deletePartnerController,
  getPartnerController,
  updatePartnerController,
} from "@/src/controllers/partners";

const partnerRouter = Router();

// if the id is null, it will return all partners
partnerRouter.get("/:id", getPartnerController);
partnerRouter.post("/", createPartnerController);
partnerRouter.put("/:id", updatePartnerController);
partnerRouter.delete("/:id", deletePartnerController);

export default partnerRouter;
