import invoiceController from '@controllers/invoice.controller'
import express from "express";

const route = express.Router();

route.route("/").get(invoiceController.getAllInvoice).post(invoiceController.createInvoice);
route.route("/current").post(invoiceController.getLastInvoiceOfStore);
route.route("/:id").get(invoiceController.getAnInvoice);

export default route;