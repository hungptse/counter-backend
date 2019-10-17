import errorHandler from "@core/error.handler";
import { sendNotificationToMobile } from 'core/expo.notification'
import { messagesRes, exceptionRes } from '@core/message'
const DB = require('@models');

async function sendNotification(req, res) {
    // const body = req.body;
    // if (body.list_distination && body.message) {
    //     const users = await DB.User.findAll({ where: { is_deleted: false, id: body.list_distination }, raw: true });
    //     if (users.length === 0) {
    //         res.status(200).send(exceptionRes(400, "User not found", ""));
    //     } else {
    //         await sendNotificationToMobile(body.message, users.map(user => user.device_id), {});
    //         res.status(200).send(messagesRes(200, "Sent"));
    //     }
    // } else {
    //     res.status(200).send(exceptionRes(400, "Missing field in body", ""));
    // }

    const body = req.body;
    if (body.message) {
        const users = await DB.User.findAll({ where: { is_deleted: false }, raw: true });
        await sendNotificationToMobile(body.message, users.filter(user => user.device_id != null).map(user => user.device_id), {});
        res.status(200).send(messagesRes(200, "Sent"));
    } else {
        res.status(200).send(exceptionRes(400, "Missing field in body", ""));
    }
}

async function setDeviceId(req, res) {
    const body = req.body;
    if (body.device_id) {
        const user = await DB.User.findOne({
            where: {
                username: req["user_id"],
            }
        });
        if (!user) {
            res.status(200).send(exceptionRes(400, "User not found", ""));
        } else {
            user.update({
                device_id: body.device_id
            }).then(() => {
                res.status(200).send(messagesRes(200, "Set device_id successfully"));
            })
        }
    } else {
        res.status(200).send(exceptionRes(400, "Missing field in body", ""));
    }
}
export default errorHandler({ sendNotification, setDeviceId });  
