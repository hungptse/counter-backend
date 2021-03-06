import errorHandler from "@core/error.handler";
import { messagesRes } from "@core/message";
import { PERMISSON_NAME, validatePermission } from "@core/permission";
const DB = require("@models");

async function getAllInvoice(req, res) {
   const isValid = await validatePermission(
      req,
      res,
      PERMISSON_NAME.GET_ALL_INVOICE
   );
   if (isValid) {
      // code logic
      const invoice = await DB.Invoice.findAll({
         where: {
            is_deleted: false
         },
         raw: true
      });
      if (invoice.length > 0) {
         res.status(200).send(messagesRes(200, "OK!", { invoice: invoice }));
      } else {
         res.status(200).send(messagesRes(400, "Not found!"));
      }
   }
}

async function getLastInvoiceOfStore(req, res) {
   const body = req.body;
   const isValid = await validatePermission(
      req,
      res,
      PERMISSON_NAME.GET_CURRENT_INVOICE_OF_STORE
   );
   if (isValid) {
      const invoices = await DB.Invoice.findAll({
         where: {
            is_deleted: false,
            store_id: body.store_id
         },
         raw: true
      });
      const counterType = await DB.CounterType.findAll({
         where: {
            is_deleted: false
         },
         raw: true
      });
      let resultInvoice = [];
      invoices.forEach(i => {
         let currentDate = new Date();
         currentDate.setMonth(currentDate.getMonth() - 1); // get last month time
         let currentYearAndMonth = currentDate.toISOString().slice(0, 7); // return yyyy-mm
         let timeNeedToFind = i.time.toISOString();
         if (timeNeedToFind.includes(currentYearAndMonth)) {
            resultInvoice.push(i);
         }
      });
      resultInvoice.forEach(ri => {
         ri["type_name"] = counterType.filter(
            ct => ct.id === ri.type_id
         )[0].name;
      });
      if (resultInvoice.length > 0) {
         res.status(200).send(
            messagesRes(200, "OK", { invoices: resultInvoice })
         );
      } else {
         res.status(200).send(messagesRes(400, "Not found"));
      }
   }
}


async function createInvoice(req, res) {
   const body = req.body;
   const isValid = await validatePermission(
      req,
      res,
      PERMISSON_NAME.CREATE_INVOICE
   );
   if (isValid) {
      // code logic
      const invoice = await DB.Invoice.findAll({
         where: {
            store_id: body.store_id,
            type_id: body.type_id
         },
         raw: true
      });
      let isExist = false;
      invoice.forEach(i => {
         let existDate = new Date(i.time);
         let invoiceDate = new Date();
         if (
            existDate.getMonth() == invoiceDate.getMonth() &&
            existDate.getFullYear() == existDate.getFullYear()
         ) {
            isExist = true;
         }
      });
      if (isExist) {
         res.status(200).send(messagesRes(400, "Invoice already in app"));
      } else {
         body["time"] = new Date();
         body["snap_image"] = "";
         body["is_deleted"] = false;
         await DB.Invoice.create(body).then(invoice => {
            if (invoice.length <= 0) {
               res.status(200).send(messagesRes(400, "Create failed"));
            } else {
               res.status(201).send(
                  messagesRes(
                     201,
                     "Invoice created",
                     invoice.get({ plain: true })
                  )
               );
            }
         });
      }
   }
}

async function getAnInvoice(req, res) {
   const id = req.params.id;
   const isValid = await validatePermission(
      req,
      res,
      PERMISSON_NAME.GET_AN_INVOICE
   );
   if (isValid && !isNaN(id)) {
      // code logic
      await DB.Invoice.findOne({
         where: {
            id: id,
            is_deleted: false
         },
         raw: true
      }).then(invoice => {
         if (invoice) {
            res.status(200).send(messagesRes(200, "OK!", invoice));
         } else {
            res.status(200).send(messagesRes(400, "Invoice not found"));
         }
      });
   } else {
      res.status(200).send(messagesRes(400, "Invalid ID"));
   }
}

export default errorHandler({
   getAllInvoice,
   createInvoice,
   getAnInvoice,
   getLastInvoiceOfStore
});
