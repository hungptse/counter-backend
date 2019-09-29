import { verifyJWT } from "@core/jwt";
import { exceptionRes } from "@core/message";
const DB = require('@models');

export default async function authenticationMiddleware(req, res, next) {
    try {
        const token = getToken(req);
        const payload = verifyJWT(token);
        const { user_id } = payload;
        req["user_id"] = user_id;
        const permissions = await getUserPermission(user_id);
        req['permisions'] = permissions;
        next();
    } catch (err) {
        res.status(200).send(exceptionRes(401, "Token invaid!", err.message.toUpperCase()));
    }
}

function getToken(req) {
    // From header or query string
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }

    return null;
}

async function getUserPermission(userId) {
    const user = await DB.User.findOne({
        where: {
            username: userId
        }
    });
    if (!user) {
        return [];
    }
    const permissionIds = await DB.RolePermission.findAll({ where: { role_id: user.role_id, is_deleted: false, is_enabled: true }, raw: true });
    if (permissionIds.length === 0) {
        return [];
    }
    const permissions = await DB.Permission.findAll({
        where: {
            id: permissionIds.map(p => p.id)
        },
        raw: true
    }).map(p => p.name);
    return permissions;
}