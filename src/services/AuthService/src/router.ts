import { Router } from "express";
import { getAuthController } from "./controllers/AuthController";

export const router: Router = Router();

const authController = getAuthController();

router.post("/auth/sign-up", authController.signUp);

router.post("/auth/login", authController.login);
