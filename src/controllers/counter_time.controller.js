import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME, validatePermission } from '@core/permission';


const DB = require('@models');


async function getAllCounterTime(req, res) {
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_ALL_COUNTER_TIME);
    if (isValid) {
        const counterTime = await DB.CounterTime.findAll({
            where: {
                is_deleted: false
            },
            raw: true
        });

        if (counterTime.length > 0) {
            res.status(200).send(messagesRes(200, "OK", { counterTime: counterTime }));
        } else {
            res.status(200).send(messagesRes(400, "Not found!"));
        }
    }

}

async function createCounterTime(req, res) {
    const body = req.body;
    body["is_deleted"] = false;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.CREATE_COUNTER_TIME)
    if (isValid) {
        await DB.CounterTime.findOrCreate({
            where: {
                counter_id: body["counter_id"]
            },
            defaults: body
        }).then(([counterTime, isCreated]) => {
            if (!isCreated) {
                res.status(200).send(messagesRes(400, "Not created!"));
            } else {
                res.status(200).send(messagesRes(200, "Counter Time Created", counterTime.get({ plain: true })));
            }
        })
    }


}

export default errorHandler({ getAllCounterTime, createCounterTime });