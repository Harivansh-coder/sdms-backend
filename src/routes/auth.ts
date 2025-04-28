import { Router } from "express";
import {
  getCurrentUserController,
  loginController,
  logoutController,
  signupController,
} from "../controllers/auth";
import validateRequestBody from "../middleware/validate";
import { loginSchema, signupSchema } from "@/src/schema/auth";
import { verifyAccessToken } from "../middleware/auth";

const authRouter = Router();

// login route
authRouter.post("/login", validateRequestBody(loginSchema), loginController);

// signup route
authRouter.post("/signup", validateRequestBody(signupSchema), signupController);

// get current logged in user route
authRouter.get("/me", verifyAccessToken, getCurrentUserController);

// logout route
authRouter.post("/logout", logoutController);

export default authRouter;
