import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME, validatePermission } from '@core/permission';
const DB = require('@models');

async function getAllPriceList(req, res) {
    const isValid = await validatePermission(req,res,PERMISSON_NAME.GET_ALL_PRICE_LIST);
    if (isValid) {
        // code logic
        const price_list = await DB.PriceList.findAll({
            where: {
                is_deleted: false
            },
            raw: true
        });
        if (price_list.length > 0) {
            res.status(200).send(messagesRes(200, "OK!", { price_list: price_list }));
        } else {
            res.status(200).send(messagesRes(400, "Not found!"));
        }
    }
}

async function createPriceList(req, res) {
   const body = req.body;
   body["is_deleted"] = false;
   const isValid = await validatePermission(req,res,PERMISSON_NAME.CREATE_PRICE_LIST);
   if (isValid) {
       // code logic
       await DB.PriceList.findOrCreate({
          where: {
             
          },
          defaults: body
       }).then(([price_list, isCreated]) => {
          if (!isCreated) {
             res.status(200).send(messagesRes(400, "Price list already in app"));
          } else {
             res.status(200).send(messagesRes(201, "Price list created", price_list.get({ plain: true })));
          }
       })
   }
}

async function getAPriceList(req, res) {
   const id = req.params.id;
   const isValid = await validatePermission(req,res,PERMISSON_NAME.GET_A_PRICE_LIST);
   if (isValid && !isNaN(id)) {
       // code logic
       await DB.PriceList.findOne({
          where: {
             id: id,
             is_deleted: false
          },
          raw: true
       }).then(priceList => {
          if (priceList) {
            res.status(200).send(messagesRes(200, "OK!", priceList));
          } else {
            res.status(200).send(messagesRes(404, "Price list not found"));
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

export default errorHandler({ getAllPriceList, createPriceList, getAPriceList });
