import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME, validatePermission } from '@core/permission';
const DB = require('@models');

async function getAllInvoice(req, res) {
    const isValid = await validatePermission(req,res,PERMISSON_NAME.GET_ALL_INVOICE);
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

async function createInvoice(req, res) {
   const body = req.body;
   body["is_deleted"] = false;
   const isValid = await validatePermission(req,res,PERMISSON_NAME.CREATE_INVOICE);
   if (isValid) {
       // code logic
       await DB.Invoice.findOrCreate({
          where: {
             store_id: body.store_id,
             type_id: body.type_id,
          },
          defaults: body
       }).then(([invoice, isCreated]) => {
          if (!isCreated) {
             res.status(200).send(messagesRes(400, "Invoice already in app"));
          } else {
             res.status(200).send(messagesRes(200, "Invoice created", invoice.get({ plain: true })));
          }
       })
   }
}

async function getAnInvoice(req, res) {
   const id = req.params.id;
   const isValid = await validatePermission(req,res,PERMISSON_NAME.GET_AN_INVOICE);
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
         //  if (!isCreated) {
         //     res.status(200).send(messagesRes(400, "Price list already in app"));
         //  } else {
         //     res.status(200).send(messagesRes(200, "Price list created", price_list.get({ plain: true })));
         //  }
       })
   } else {
      res.status(200).send(messagesRes(400, "Invalid ID"));
   }
}

export default errorHandler({ getAllInvoice, createInvoice, getAnInvoice });
