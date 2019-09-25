import authenticationRoutes from "@routes/authentication.route";
import authenMiddleware from "@middlewares/authentication.middleware";
import storeRoutes from "@routes/store.route";
import express from "express";
import os from "os";

const router = express.Router();

router.get("/", (_, res) =>
    res.send({
        message: "Server is up!",
        uptime: `${os.uptime()} seconds`
    })
);

router.use("/auth", authenticationRoutes);
router.use("/store", authenMiddleware,storeRoutes);


export default router;