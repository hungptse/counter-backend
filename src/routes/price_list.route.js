import priceListController from '@controllers/price_list.controller'
import express from "express";

const route = express.Router();

route.route("/").get(priceListController.createPriceList);

export default route;