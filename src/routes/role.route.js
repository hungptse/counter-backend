import roleController from '@controllers/role.controller'
import express from "express";

const route = express.Router();

route.route("/").get(roleController.getAllRole).post(roleController.createRole).delete(roleController.deleteRole);

export default route;