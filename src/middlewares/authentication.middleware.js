import { verifyJWT } from "@core/jwt";
import { exceptionRes } from "@core/message";

export default async function authenticationMiddleware(req, res, next) {
    try {
        const token = getToken(req);
        const payload = verifyJWT(token);
        const { user_id } = payload;
        req["user_id"] = user_id;
        next();
    } catch (err) {
        res.status(200).send(exceptionRes(401,"Token invaid!",err.message.toUpperCase()));
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