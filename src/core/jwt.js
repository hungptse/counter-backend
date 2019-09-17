import jwt from "jsonwebtoken";

export function createJWT(userid) {
    return jwt.sign(
        {
            user_id: userid,
        },
        "key",
        { expiresIn: "24h" }
    );
}

export function verifyJWT(token) {
    return jwt.verify(token, "key");
}