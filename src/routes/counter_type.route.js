import express from "express";
import counterTypeController from "@controllers/counter_type.controller";

const router = express.Router();

router.route("/").get(counterTypeController.getAllCounterType);

export default router;