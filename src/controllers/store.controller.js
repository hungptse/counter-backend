import errorHandler from "@core/error.handler";
import { messagesRes } from "@core/message";
var db  = require('@models');
async function getAllStore(req, res) {
    const data = await db.Store.findAll();
    if (data != null) {
        res.status(200).send(messagesRes(200, "OK", data));
    } else {
        res.status(200).send(messagesRes(400, "Not found"));
    }
}

async function getStoreByID(req, res) {
    const id = req.params.id;
    const data = await db.Store.findByPk(id);
    if (data != null) {
        res.status(200).send(messagesRes(200, "OK", data));
    } else {
        res.status(200).send(messagesRes(400, "Not found"));
    }
}


export default errorHandler({ getAllStore , getStoreByID });
