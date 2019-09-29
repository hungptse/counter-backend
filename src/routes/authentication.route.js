import express from "express";
import authController from "@controllers/authentication.controller";
import authenticationMiddleware from "middlewares/authentication.middleware";

const router = express.Router();

router.route("/login").post(authController.loginWithUsernamePassword);
router.route("/register").post(authController.registerWithUsernamePassword);

router.put("/password",authenticationMiddleware,authController.changePassword);

export default router;