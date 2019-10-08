import priceDetailController from '@controllers/price_detail.controller'
import express from "express";

const route = express.Router();

route.route("/").get(priceDetailController.getAllPriceDetail).post(priceDetailController.createPriceDetail);

export default route;