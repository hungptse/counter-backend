import express from "express";
import counterController from "@controllers/counter.controller";

const router = express.Router();

router.route("/").get(counterController.getAllCounter).post(counterController.createCounter);

router.route("/:id").get(counterController.getCounterByID);

router.route("/store_type").post(counterController.getCounterByStoreID);

router.route("/type/:id").get(counterController.getCounterByStoreID);

export default router;