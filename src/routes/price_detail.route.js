import priceDetailController from '@controllers/price_detail.controller'
import express from "express";

const route = express.Router();

route.route("/").post(priceDetailController.createPriceDetail);
route.route("/detail").post(priceDetailController.getAPriceDetail);

export default route;