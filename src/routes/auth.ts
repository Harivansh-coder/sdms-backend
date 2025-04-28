import { Router } from "express";
import {
  getCurrentUserController,
  loginController,
  signupController,
} from "@/src/controllers/auth";
import validateRequestBody from "@/src/middleware/validate";
import { loginSchema, signupSchema } from "@/src/schema/auth";
import { verifyAccessToken } from "@/src/middleware/auth";

const authRouter = Router();

// login route
authRouter.post("/login", validateRequestBody(loginSchema), loginController);

// signup route
authRouter.post("/signup", validateRequestBody(signupSchema), signupController);

// get current logged in user route
authRouter.get("/me", verifyAccessToken, getCurrentUserController);

export default authRouter;
