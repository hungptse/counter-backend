import express from "express";
import authController from "@controllers/authentication.controller";

const router = express.Router();

router.route("/login").post(authController.loginWithUsernamePassword);
router.route("/register").post(authController.registerWithUsernamePassword);


export default router;