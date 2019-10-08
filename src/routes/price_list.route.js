import priceListController from '@controllers/price_list.controller'
import express from "express";

const route = express.Router();

route.route("/").get(priceListController.getAllPriceList).post(priceListController.createPriceList);
route.route("/:id").get(priceListController.getAPriceList);

export default route;