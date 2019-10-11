import authenticationRoutes from "@routes/authentication.route";
import authenMiddleware from "@middlewares/authentication.middleware";
import storeRoutes from "@routes/store.route";
import notiRoutes from '@routes/notification.route'
import userRoutes from '@routes/user.route'
import roleRoutes from '@routes/role.route'
import permissionRoutes from '@routes/permission.route'
import priceDetailRoutes from "@routes/price_detail.route";
import priceListRoutes from "@routes/price_list.route";
import invoiceRoutes from "@routes/invoice.route";
import userStoreRoutes from "@routes/user_store.route";
import activePriceListRoutes from "@routes/active_price_list.route";
import counterRoutes from '@routes/counter.route';
import counterTimeRoutes from "@routes/counter_time.route";
import counterTypeRoutes from "@routes/counter_type.route";
import companyRoutes from "@routes/company.route";


import express from "express";
import os from "os";
import route from "routes/permission.route";

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
router.use("/price_detail", authenMiddleware, priceDetailRoutes);
router.use("/price_list", authenMiddleware, priceListRoutes);
router.use("/invoice", authenMiddleware, invoiceRoutes);
router.use("/user_store", authenMiddleware, userStoreRoutes);
router.use("/active_price_list", authenMiddleware, activePriceListRoutes);

router.use("/store", authenMiddleware, storeRoutes);
router.use("/notification", authenMiddleware, notiRoutes);
router.use("/user", authenMiddleware, userRoutes);
router.use("/role", authenMiddleware, roleRoutes);
router.use("/permission", authenMiddleware, permissionRoutes);
router.use("/counter", authenMiddleware, counterRoutes);
router.use("/counter_time", authenMiddleware, counterTimeRoutes);
router.use("/counter_type", authenMiddleware, counterTypeRoutes);
router.use("/company", authenMiddleware, companyRoutes);

export default router;