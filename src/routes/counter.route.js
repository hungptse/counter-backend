import express from "express";
import counterController from "@controllers/counter.controller";

const router = express.Router();

router.route("/").get(counterController.getAllCounter).post(counterController.createCounter);

router.route("/:id").get(counterController.getCounterByID);

export default router;