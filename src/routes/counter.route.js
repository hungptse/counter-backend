import express from "express";
import counterController from "@controllers/counter.controller";

const router = express.Router();

router.route("/").get(counterController.getAllCounter).post(counterController.createCounter);//.post(counter.createCounter);

// router.route("/:id").get(counter.getCounterByID);

export default router;