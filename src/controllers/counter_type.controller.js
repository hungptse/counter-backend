import errorHandler from "@core/error.handler"
import { messagesRes } from "@core/message";

import { PERMISSON_NAME, validatePermission } from "@core/permission";

const DB = require('@models');

async function getAllCounterType(req, res) {
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_ALL_COUNTER_TYPE);
    if (isValid) {
        const counterType = DB.CounterType.findAll({
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

export default errorHandler({ getAllCounterType });
