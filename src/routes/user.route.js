import userController from '@controllers/user.controller'
import express from "express";


const route = express.Router();

route.route("/").get(userController.getUsersList).post(userController.addUser).put(userController.updateUser);
route.route("/profile").get(userController.getUserInfomation);

export default route;