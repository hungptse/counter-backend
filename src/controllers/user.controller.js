import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME, validatePermission } from '@core/permission';
const DB = require('@models');


async function getUserInfomation(req, res) {
    const permissions = req['permissions'];
    const user = req['user'];
    res.status(200).send(messagesRes(200, "OK",{
        granted_permission : permissions,
        info : user
    }));
}

async function getAllUser(req, res) {
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_ALL_USER);
    if (isValid) {
        const user = await DB.User.findAll({
            where: {
                is_deleted: false
            },
            raw: true
        });
        if (user.length > 0) {
            res.status(200).send(messagesRes(200, "OK", { user: user }));
        } else {
            res.status(200).send(messagesRes(400, "Not found"));
        }
    }
}


async function getUserByUsername(req,res) {
    const body = req.body;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_USER_BY_USERNAME);
    if (isValid) {
        const user = await DB.User.findAll({
            attributes: ['username', 'name', 'id', 'gender', 'phone_number', 'role_id','address','email'],
            where: {
                is_deleted: false,
                username: body.username
            },
            raw: true
        });
        if (user.length > 0) {
            res.status(200).send(messagesRes(200, "OK", { user: user }));
        } else {
            res.status(200).send(messagesRes(400, "Not found"));
        }
    }
    
}

export default errorHandler({ getUserInfomation, getUserByUsername });
