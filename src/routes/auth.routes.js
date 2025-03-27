import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", (req, res) => AuthController.SignUp(req, res));
authRoutes.post("/login", (req, res) => AuthController.SignIn(req, res));

export default authRoutes;
