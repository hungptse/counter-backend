import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME, validatePermission } from '@core/permission';
const DB = require('@models');

async function getActivePriceListForStore(req, res) {
   
    const body = req.body;
    const isValid = await validatePermission(req,res,PERMISSON_NAME.GET_ACTIVE_PRICE_LIST_FOR_STORE);
    if (isValid) {
        // code logic
        const activePriceList = await DB.ActivePriceList.findOne({
            where: {
                is_deleted: false,
                store_id: body.store_id,
                is_active: true
            },
            raw: true
        });
        if (activePriceList) {
            res.status(200).send(messagesRes(200, "OK!", { active_price_list: activePriceList }));
        } else {
            res.status(200).send(messagesRes(400, "Not found!"));
        }
    }
}

async function createActivePriceList(req, res) {
   const body = req.body;
   body["is_deleted"] = false;
   const isValid = await validatePermission(req,res,PERMISSON_NAME.CREATE_ACTIVE_PRICE_LIST);
   if (isValid) {
       // code logic
       await DB.ActivePriceList.findOrCreate({
          where: {
             plist_id: body.plist_id,
             store_id: body.store_id
          },
          defaults: body
       }).then(([activePriceList, isCreated]) => {
          if (!isCreated) {
             res.status(200).send(messagesRes(400, "Active price list already in app"));
          } else {
             res.status(200).send(messagesRes(201, "Active price list created", activePriceList.get({ plain: true })));
          }
       })
   }
}

export default errorHandler({ getActivePriceListForStore, createActivePriceList });
