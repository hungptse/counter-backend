import errorHandler from "@core/error.handler";
import { messagesRes } from "@core/message";
import { PERMISSON_NAME, validatePermission } from "@core/permission";
const DB = require("@models");

async function getAllUserStore(req, res) {
   const isValid = await validatePermission(
      req,
      res,
      PERMISSON_NAME.GET_ALL_USER_STORE
   );
   if (isValid) {
      // code logic
      const userStore = await DB.UserStore.findAll({
         where: {
            is_deleted: false
         },
         raw: true
      });
      if (userStore.length > 0) {
         res.status(200).send(
            messagesRes(200, "OK!", { user_store: userStore })
         );
      } else {
         res.status(200).send(messagesRes(400, "Not found!"));
      }
   }
}

async function getUserStoreByUser(req, res) {
   const id = req.params.id;
   const isValid = await validatePermission(
      req,
      res,
      PERMISSON_NAME.GET_USER_STORE_BY_USER
   );
   if (isValid) {
      // code logic
      const userStore = await DB.UserStore.findAll({
         where: {
            is_deleted: false,
            user_id: id !== undefined ? id : req.user.id
         },
         raw: true
      });
      if (userStore.length > 0) {
         const stores = await DB.Store.findAll({
            where: {
               is_deleted: false,
               id: userStore.map(us => us.store_id)
            },
            raw: true
         });
         userStore.forEach(us => {
            us["stores"] = stores.filter(s => s.id === us.store_id)[0];
         });
         
         res.status(200).send(
            messagesRes(200, "OK!", { user_store: userStore })
         );
      } else {
         res.status(200).send(messagesRes(400, "Not found!"));
      }
   }
}

async function createUserStore(req, res) {
   const body = req.body;
   body["is_deleted"] = false;
   const isValid = await validatePermission(
      req,
      res,
      PERMISSON_NAME.CREATE_USER_STORE
   );
   if (isValid) {
      // code logic
      await DB.UserStore.findOrCreate({
         where: {},
         defaults: body
      }).then(([userStore, isCreated]) => {
         if (!isCreated) {
            res.status(200).send(messagesRes(400, "User Store already in app"));
         } else {
            res.status(200).send(
               messagesRes(
                  200,
                  "User Store created",
                  userStore.get({ plain: true })
               )
            );
         }
      });
   }
}

// async function getAPriceList(req, res) {
//    const id = req.params.id;
//    const isValid = await validatePermission(req,res,PERMISSON_NAME.GET_A_PRICE_LIST);
//    if (isValid && !isNaN(id)) {
//        // code logic
//        await DB.PriceList.findOne({
//           where: {
//              id: id,
//              is_deleted: false
//           },
//           raw: true
//        }).then(priceList => {
//           if (priceList) {
//             res.status(200).send(messagesRes(200, "OK!", priceList));
//           } else {
//             res.status(200).send(messagesRes(400, "Price list not found"));
//           }
//          //  if (!isCreated) {
//          //     res.status(200).send(messagesRes(400, "Price list already in app"));
//          //  } else {
//          //     res.status(200).send(messagesRes(200, "Price list created", price_list.get({ plain: true })));
//          //  }
//        })
//    } else {
//       res.status(200).send(messagesRes(400, "Invalid ID"));
//    }
// }

export default errorHandler({
   getAllUserStore,
   createUserStore,
   getUserStoreByUser
});
