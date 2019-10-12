import errorHandler from '@core/error.handler'
import { messagesRes, exceptionRes } from '@core/message'
import { validate } from 'swagger-parser';
import { validatePermission, PERMISSON_NAME } from 'core/permission';
import { Op } from 'sequelize';

const DB = require('models');
async function getUserInfomation(req, res) {
    const permissions = req['permissions'];
    const user = req['user'];
    res.status(200).send(messagesRes(200, "OK", {
        granted_permission: permissions,
        info: user
    }));
}

async function getUsersList(req, res) {
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_USER_LIST);
    if (isValid) {
        const userList = await DB.User.findAll({
            where: {
                is_deleted: false
            },
            raw: true
        });
        if (userList.length > 0) {
            res.status(200).send(messagesRes(200, "OK", { userList: userList }));
        } else {
            res.status(200).send(messagesRes(400, "Not found!"));
        }
    }
}
async function updateUser(req, res) {
    const body = req.body;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.UPDATE_USER);
    if (isValid) {
        const user = await DB.User.findOne({
            where: {
                username: req["user_id"]
            }
        });
        if (!user) {
            res.status(200).send(exceptionRes(404, "User doesn't existed!"));
        } else {

            user.update({
                name: body.name,
                address: body.address

            }).then(() => {
                res.status(200).send(messagesRes(200, "Update Successfully!", { user: user }));
            })
        }
    }
}

async function addUser(req, res) {
    const body = req.body;
    body["is_deleted"] = false;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.ADD_USER);
    if (isValid) {
        await DB.User.findOrCreate({
            where: {
                [Op.or]: [{ username: body.username }, { phone_number: body.phone_number }, { email: body.email }]
            },
            defaults: body
        }).then(([user, isCreate]) => {
            if (!isCreate) {
                res.status(200).send(messagesRes(400, "User already exist!"));
            } else {
                res.status(200).send(messagesRes(200, "Add user successfully!", user.get({ plain: true })));
            }
        })
    }
}

export default errorHandler({ getUserInfomation, addUser, getUsersList, updateUser });
