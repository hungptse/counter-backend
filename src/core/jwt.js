import jwt from "jsonwebtoken";


export function createJWT(userid) {
    return jwt.sign(
        {
            user_id: userid,
        },
        process.env.JWT_SECRET_KEY
        , { expiresIn: "24h" }
    );
}

export function verifyJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}