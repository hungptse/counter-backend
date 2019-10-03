import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSION } from "@core/permission";

async function getAllPermission(req, res) {
    res.status(200).send(messagesRes(200, "OK", {
        permissions : PERMISSION
    }));
}

export default errorHandler({ getAllPermission });
