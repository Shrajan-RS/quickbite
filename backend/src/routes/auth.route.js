import { Router } from "express";
import {
  signUp,
  login,
  logout,
  sendResetOTP,
  verifyResetOTP,
  resetPassword,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUp);

authRouter.post("/login", login);

authRouter.post("/send-otp", sendResetOTP);

authRouter.post("/verify-otp", verifyResetOTP);

authRouter.post("/reset-password", resetPassword);

authRouter.get("/logout", logout);

export default authRouter;
