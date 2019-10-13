import userStoreController from '@controllers/user_store.controller'
import express from "express";

const route = express.Router();

route.route("/").get(userStoreController.getUserStoreByUser).post(userStoreController.createUserStore);
route.route("/:id").post(userStoreController.getUserStoreByUser);
// route.route("/:id").get(priceListController.getAPriceList);

export default route;