import activePriceListController from '@controllers/active_price_list.controller'
import express from "express";

const route = express.Router();

route.route("/").post(activePriceListController.createActivePriceList);
route.route("/active").post(activePriceListController.getActivePriceListForStore);

export default route;