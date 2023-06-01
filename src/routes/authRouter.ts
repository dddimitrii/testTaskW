import { Router } from "express";
import AuthController from "../controllers/authController";

const AuthRouter = Router();

AuthRouter.post("/registration", AuthController.registration);
AuthRouter.post("/login", AuthController.login);

export { AuthRouter };
