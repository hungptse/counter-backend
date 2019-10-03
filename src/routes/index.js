import authenticationRoutes from "@routes/authentication.route";
import authenMiddleware from "@middlewares/authentication.middleware";
import storeRoutes from "@routes/store.route";
import notiRoutes from '@routes/notification.route'
import userRoutes from '@routes/user.route'
import roleRoutes from '@routes/role.route'
import permissionRoutes from '@routes/permission.route'
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
router.use("/notification", authenMiddleware,notiRoutes);
router.use("/user", authenMiddleware,userRoutes);
router.use("/role", authenMiddleware,roleRoutes);
router.use("/permission", authenMiddleware,permissionRoutes);


export default router;