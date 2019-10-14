import errorHandler from '@core/error.handler'
import { messagesRes, exceptionRes } from '@core/message'
import { Op } from 'sequelize';
import { PERMISSON_NAME, validatePermission } from '@core/permission';
import Configuration from "@core/config";
import { encryptPassword } from '@core/bcrypt'
const DB = require('@models');


async function getUserInfomation(req, res) {
    const permissions = req['permissions'];
    const user = req['user'];
    res.status(200).send(messagesRes(200, "OK", {
        granted_permission: permissions,
        info: user
    }));
}

async function getAllUser(req, res) {
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_ALL_USER);
    if (isValid) {
        const user = await DB.User.findAll({
            attributes: ['username', 'name', 'id', 'gender', 'phone_number', 'role_id', 'address', 'email'],
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


async function getUserByUsername(req, res) {
    const body = req.body;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.GET_USER_BY_USERNAME);
    if (isValid) {
        const user = await DB.User.findAll({
            attributes: ['username', 'name', 'id', 'gender', 'phone_number', 'role_id', 'address', 'email'],
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
async function updateUser(req, res) {
    const body = req.body;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.UPDATE_USER);
    if (isValid) {
        const user = await DB.User.findOne({
            attributes: ['username', 'name', 'id', 'gender', 'phone_number', 'role_id', 'address', 'email'],
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
async function updateUserRole(req, res) {
    const body = req.body;
    const isValid = await validatePermission(req, res, PERMISSON_NAME.UPDATE_ROLE);
    if (isValid) {
        const user = await DB.User.findOne({
            attributes: ['username', 'name', 'id', 'gender', 'phone_number', 'role_id', 'address', 'email'],
            where: {
                id: body["user_id"]
            }
        });
        if (!user) {
            res.status(200).send(exceptionRes(404, "User doesn't existed!"));
        } else {
            const role = await DB.Role.findOne({
                where: {
                    id: body["role_id"]
                }
            });
            if (!role) {
                res.status(200).send(exceptionRes(400, "Role doesn't existed!"));
            } else {
                user.update({
                    role_id: body["role_id"],
                }).then(() => {
                    res.status(200).send(messagesRes(200, "Update Successfully!", { user: user }));
                })
            }
        }
    }
}
async function addUser(req, res) {
    const body = req.body;
    body["is_deleted"] = false;
    body["password"] = encryptPassword(Configuration.DEFAULT_PWD);
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

export default errorHandler({ getUserInfomation, getAllUser, getUserByUsername, addUser, updateUser, updateUserRole });
