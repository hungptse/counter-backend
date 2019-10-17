import express from "express"
import companyController from "@controllers/company.controller"

const router = express.Router();

router.route("/").get(companyController.getAllCompany).post(companyController.createCompany);
router.route("/:id").put(companyController.updateCompany);

export default router;