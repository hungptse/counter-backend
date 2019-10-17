import express from "express"
import counterTimeController from "@controllers/counter_time.controller"

const router = express.Router();

router.route("/").get(counterTimeController.getAllCounterTime).post(counterTimeController.createCounterTime);
router.route("/max/:id").get(counterTimeController.getCounterTimeByTime);

export default router;