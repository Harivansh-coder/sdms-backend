"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partners_1 = require("@/src/controllers/partners");
const auth_1 = require("../middleware/auth");
const validate_1 = __importDefault(require("../middleware/validate"));
const partner_1 = require("../schema/partner");
const partnerRouter = (0, express_1.Router)();
partnerRouter.get("/", auth_1.verifyAccessToken, partners_1.getPartnerController);
partnerRouter.get("/:id", auth_1.verifyAccessToken, partners_1.getPartnerController);
partnerRouter.post("/", auth_1.verifyAccessToken, (0, validate_1.default)(partner_1.partnerSchema), partners_1.createPartnerController);
partnerRouter.put("/:id", auth_1.verifyAccessToken, (0, validate_1.default)(partner_1.partnerUpdateSchema), partners_1.updatePartnerController);
partnerRouter.delete("/:id", auth_1.verifyAccessToken, partners_1.deletePartnerController);
exports.default = partnerRouter;
