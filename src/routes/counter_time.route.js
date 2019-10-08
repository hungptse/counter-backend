import express from "express"
import counterTimeController from "@controllers/counter_time.controller"

const router = express.Router();

router.route("/").get(counterTimeController.getAllCounterTime).post(counterTimeController.createCounterTime);

export default router;