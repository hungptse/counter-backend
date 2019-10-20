import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME, validatePermission } from '@core/permission';
import { Op } from 'sequelize';

const DB = require('@models');


async function getAllCounter(req, res) {
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_ALL_COUNTER);
    if (isValid) {
        const counter = await DB.Counter.findAll({
            where: {
                is_deleted: false
            },
            raw: true
        });
        const store = await DB.Store.findAll({
            where: {
                is_deleted: false
            },
            raw: true
        });
        if (counter.length > 0 && store.length > 0) {
            counter.forEach(c => c["store_name"] = store.filter(s => s.id == c.store_id)[0].name)
            res.status(200).send(messagesRes(200, "OK", { counter: counter }));
        } else {
            res.status(200).send(messagesRes(400, "Not found"));
        }
    }

}

async function getCounterByStoreID(req,res){
    const isValid = await validatePermission(req,res,PERMISSON_NAME.GET_COUNTER_BY_STORE_ID);
    const body = req.body;
    body["is_deleted"] = false;
    if(isValid){
        const counter = await DB.Counter.findOne({
            where: {
                store_id : body["store_id"],
                type_id: body["type_id"],
                is_deleted: false
            },
            raw: true
        })
        if(counter != null){
            res.status(200).send(messagesRes(200,"OK", {counter:counter}));
        } else{
            res.status(200).send(messagesRes(400,"Not found!"));
        }
    }
}

async function getCounterByTypeID(req,res){
    const isValid = await validatePermission(req,res,PERMISSON_NAME.GET_COUNTER_BY_TYPE_ID);
    if(isValid){
        const counter = await DB.Counter.findOne({
            where: {
                type_id: req.params.id
            },
            raw: true
        })
        if(counter != null){
            res.status(200).send(messagesRes(200,"OK", {counter:counter}));
        }else{
            res.status(200).send(messagesRes(400,"Not found!"));
        }
    }
}


async function createCounter(req, res) {
    const body = req.body;
    body["is_deleted"] = false;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.CREATE_COUNTER);
    if (isValid) {
        const store = await DB.Store.findOne({
            where: {
                id: body.store_id,
                is_deleted: false
            },
            raw: true
        });
        if (store) {
            await DB.Counter.findOrCreate({
                where: {
                    type_id: body.type_id,
                    store_id: body.store_id
                },
                defaults: body
            }).then(([counter, isCreated]) => {
                if (!isCreated) {
                    res.status(200).send(messagesRes(400, "Not Create"));
                } else {
                    const result = counter.get({ plain: true });
                    result["store_name"] = store.name;
                    res.status(200).send(messagesRes(201, "Counter created", result ));
                }
            })
        } else {
            res.status(200).send(messagesRes(404, "Store not found!"));
        }

    }

}

async function getCounterByID(req, res) {
    const id = req.params.id;
    const counter = await DB.Counter.findByPk(id);
    if (counter != null) {
        res.status(200).send(messagesRes(200, "OK", counter));
    } else {
        res.status(200).send(messagesRes(400, "Not found!"));
    }
}

export default errorHandler({ getAllCounter, createCounter, getCounterByID, getCounterByStoreID, getCounterByTypeID});