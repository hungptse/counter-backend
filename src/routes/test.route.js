import express from "express";
import test from "@controllers/test.controller";

const router = express.Router();

router.route("/").post(test.testFunctionWithJWT);

export default router;