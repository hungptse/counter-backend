import userController from '@controllers/user.controller'
import express from "express";


const route = express.Router();

route.route("/").get(userController.getUserInfomation).post(userController.getUserByUsername);

export default route;