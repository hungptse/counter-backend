import errorHandler from "@core/error.handler";
import { createJWT } from "@core/jwt";
import { encryptPassword, checkPassword } from "@core/bcrypt";
import { messagesRes, exceptionRes } from "@core/message";
const DB = require("@models");
async function loginWithUsernamePassword(req, res) {
    const body = req.body;
    const user = await DB.User.findOne({
        where: {
            username: body.username,
        }
    });
    if (!user) {
        res.status(200).send(exceptionRes(404, "User doesn't existed"));
    } else {
        const isMatch = await checkPassword(body.password, user.password);
        if (isMatch) {
            res.status(200).send(messagesRes(200, "Login sucessfully", {
                token: createJWT(body.username)
            }));
        } else {
            res.status(200).send(messagesRes(403, "Permission denied! Invalid username and password"));
        }
    }
}

async function registerWithUsernamePassword(req, res) {
    const body = req.body;
    console.log(encryptPassword(body.password));
    res.status(200).send({ ok: "OK" });
    // await encryptPassword(body.password);
    // if (body.username === 'admin' && body.password === '123') {
    //     res.status(200).send(messagesRes(200,"Login sucessfully",{
    //         token : createJWT(body.username)
    //     }));     
    // } else {
    //     res.status(403).send(messagesRes(403,"Permission denied! Invalid username and password"));
    // }
}

async function createRole(req, res) {

}

async function updateRole(req, res) {

}

async function setRolePremission(req, res) {

}

async function updateRolePermission(req, res) {

}

async function getPermission(req, res) {

}

export default errorHandler({ loginWithUsernamePassword, registerWithUsernamePassword });
