import errorHandler from "@core/error.handler";
import { messagesRes } from "@core/message";
import { PERMISSON_NAME, validatePermission } from '@core/permission';
const DB = require('@models');
async function getAllStore(req, res) {
    const isValid = await validatePermission(req, res, PERMISSON_NAME.VIEW_USER);
    if (isValid) {
        const stores = await DB.Store.findAll({ where: { is_deleted: false }, raw: true });
        if (stores != null) {
            const company = await DB.Company.findAll({
                where: {
                    id: stores.map(s => s.company_id).filter((value, index, self) => { return self.indexOf(value) === index; })
                },
                raw: true
            });
            stores.forEach(s => {
                s["company_name"] = company.filter(c => c.id === s.company_id)[0].name;
            })
            res.status(200).send(messagesRes(200, "OK", {
                items: stores,
                total: stores.length
            }));
        } else {
            res.status(200).send(messagesRes(400, "Not found"));
        }
    }
}

async function getStoreByID(req, res) {
    const id = req.params.id;
    const store = await DB.Store.findByPk(id);
    if (store != null) {
        res.status(200).send(messagesRes(200, "OK", store));
    } else {
        res.status(200).send(messagesRes(400, "Not found"));
    }
}

async function createStore(req, res) {
    const body = req.body;
    body["is_deleted"] = false;

    const company = await DB.Company.findOne({
        where: {
            id: body["company_id"]
        },
        raw: true
    });
    if (company) {
        await DB.Store.findOrCreate({
            where: {
                name: body["name"],
                company_id: body["company_id"],
                address: body["address"]
            },
            defaults: body
        }).then(([store, isCreated]) => {
            if (!isCreated) {
                res.status(200).send(messagesRes(400, "Store already existed in company"));
            } else {
                const result = store.get({ plain: true });
                result["company_name"] = company.name;
                res.status(201).send(messagesRes(200, "Store created", result));
            }
        });
    } else {
        res.status(200).send(messagesRes(400, "Company invalid"));
    }
}

async function deleteStore(req, res) {
    const id = req.params.id;
    const store = await DB.Store.findByPk(id);
    if (store != null) {
        store["is_deleted"] = true;
        store.save().then(() => {
            res.status(200).send(messagesRes(200, "Deleted store"));
        })
    } else {
        res.status(200).send(messagesRes(400, "Not found"));
    }
}

async function updateStore(req, res) {
    const id = req.params.id;
    const body = req.body;

    const company = await DB.Company.findOne({
        where: {
            id: body["company_id"]
        },
        raw: true
    });
    if (company) {
        const store = await DB.Store.findByPk(id);
        if (store) {
            store["name"] = body["name"];
            store["address"] = body["address"];
            store["company_id"] = body["company_id"];
            store.save().then(() => {
                const result = store.get({ plain : true});
                result["company_name"] = company.name;
                console.log(result)
                res.status(200).send(messagesRes(200, "Updated store", result));
            })
        } else {
            res.status(200).send(messagesRes(400, "Not found"));
        }
    }

}


export default errorHandler({ getAllStore, getStoreByID, createStore, deleteStore, updateStore });
