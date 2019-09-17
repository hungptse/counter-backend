import express from "express";
import authController from "@controllers/authentication.controller";

const router = express.Router();

router.route("/login").post(authController.loginWithUsernamePassword);

export default router;