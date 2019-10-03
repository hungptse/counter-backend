import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'
import { PERMISSON_NAME } from "@core/permission";
const DB = require('@models');

async function getAllRole(req, res) {
    const roles = await DB.Role.findAll({
        where: {
            is_deleted: false
        },
        raw: true
    });
    res.status(200).send(messagesRes(200, "OK", {
        roles: roles
    }));
}

async function createRole(req, res) {
    const body = req.body;
    const namePermission = [];
    
    await DB.Role.findOrCreate({
        where: {
            name: body.name,
        },
        defaults: body
    }).then(async ([role, isCreated]) => {
        if (!isCreated) {
            res.status(200).send(messagesRes(400, "Role already existed in app"));
        } else {
            Object.keys(PERMISSON_NAME).forEach(name => {
                namePermission.push({ role_id: role.id , permission_name: name, is_deleted: false });
            })
            await DB.RolePermission.bulkCreate(namePermission).then((result) => {
                console.log(result);
            })
            res.status(200).send(messagesRes(200, "Role created", role.get({ plain: true })));
        }
    });
}
export default errorHandler({ getAllRole, createRole });
