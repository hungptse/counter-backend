import express from "express";
import notiController from "@controllers/notification.controller";

const router = express.Router();

router.route("/").post(notiController.sendNotification);
router.route("/").put(notiController.setDeviceId);


export default router;