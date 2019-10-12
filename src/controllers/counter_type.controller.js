import errorHandler from "@core/error.handler"
import { messagesRes } from "@core/message";

import { PERMISSON_NAME, validatePermission } from "@core/permission";

const DB = require('@models');

async function getAllCounterType(req, res) {
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_ALL_COUNTER_TYPE);
    if (isValid) {
        const counterType = await DB.CounterType.findAll({
            where: {
                is_deleted: false
            },
            raw: true
        });
        if (counterType.length > 0) {
            res.status(200).send(messagesRes(200, "OK", { counterType: counterType }));
        } else {
            res.status(200).send(messagesRes(400, "Not found!"));
        }
    }
}


async function createCounterType(req, res) {
    const body = req.body;
    body["is_deleted"] = false;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.CREATE_COUNTER_TYPE);
    if (isValid) {
        await DB.CounterType.findOrCreate({
            where: {
                name: body["name"]
            },
            defaults: body
        }).then(([counterType, isCreated]) => {
            if (!isCreated) {
                res.status(200).send(messagesRes(400, "Counter type already existed!"));
            } else {
                res.status(200).send(messagesRes(200, "Counter type created!", counterType.get({ plain: true })))
            }
        })
    }
}

export default errorHandler({ getAllCounterType, createCounterType });
