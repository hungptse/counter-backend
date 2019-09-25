import errorHandler from "@core/error.handler";
import { messagesRes } from "@core/message";
var db = require('@models');
async function getAllStore(req, res) {
    const stores = await db.Store.findAll({ where: { is_deleted: false } });
    if (stores != null) {
        res.status(200).send(messagesRes(200, "OK", {
            items : stores,
            total : stores.length
        }));
    } else {
        res.status(200).send(messagesRes(400, "Not found"));
    }
}

async function getStoreByID(req, res) {
    const id = req.params.id;
    const store = await db.Store.findByPk(id);
    if (store != null) {
        res.status(200).send(messagesRes(200, "OK", store));
    } else {
        res.status(200).send(messagesRes(400, "Not found"));
    }
}

async function createStore(req, res) {
    const body = req.body;
    body["is_deleted"] = false;
    await db.Store.findOrCreate({
        where: {
            name: body["name"],
            company_id: body["company_id"]
        },
        defaults: body
    }).then(([store, isCreated]) => {
        if (!isCreated) {
            res.status(200).send(messagesRes(400, "Store already existed in company"));
        } else {
            res.status(200).send(messagesRes(400, "Store created", store.get({ plain: true })));
        }
    });
}

async function deleteStore(req, res) {
    const id = req.params.id;
    const store = await db.Store.findByPk(id);
    if (store != null) {
        store["is_deleted"] = true;
        store.save().then(() => {
            res.status(200).send(messagesRes(200, "Deleted store"));
        })
    } else {
        res.status(200).send(messagesRes(400, "Not found"));
    }
}


export default errorHandler({ getAllStore, getStoreByID, createStore, deleteStore });
