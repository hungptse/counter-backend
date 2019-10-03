import permissionController from '@controllers/permission.controller'
import express from "express";

const route = express.Router();

route.route("/").get(permissionController.getAllPermission);

export default route;