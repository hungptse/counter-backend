import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME, validatePermission } from '@core/permission';

const DB = require('@models');


async function getAllCounter(req, res) {
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_ALL_COUNTER);
    if (isValid) {
        const counter = DB.Counter.findAll({
            where: {
                is_deleted: false
            },
            raw: true
        });
        if (counter.length > 0) {
            res.status(200).send(messagesRes(200, "OK", { counter: counter }));
        } else {
            res.status(200).send(messagesRes(400, "Not found"));
        }
    }

}


async function createCounter(req, res) {
    const body = req.body;
    body["is_deleted"] = false;
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
            res.status(200).send(messagesRes(200, "Counter created", counter.get({ plain: true })));
        }
    })
}

export default errorHandler({ getAllCounter, createCounter });