import { Router } from "express";
import { register, login } from "./auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads-pp.js";

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     responses:
 *       200:
 *         description: User registered
 */
router.post(
  "/register",
  uploadProfilePicture.single("adminPicture"), 
  registerValidator,
  register
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     responses:
 *       200:
 *         description: User logged in
 */
router.post("/login", loginValidator, login);

export default router;
