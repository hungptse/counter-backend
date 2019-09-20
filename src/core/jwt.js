import jwt from "jsonwebtoken";
import Configuration from "@core/config";

export function createJWT(userid) {
    return jwt.sign(
        {
            user_id: userid,
        },
        Configuration.JWT_SECRET_KEY
        , { expiresIn: "24h" }
    );
}

export function verifyJWT(token) {
    return jwt.verify(token, Configuration.JWT_SECRET_KEY);
}