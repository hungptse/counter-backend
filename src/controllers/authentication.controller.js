import errorHandler from "@core/error.handler";
import { createJWT } from "@core/jwt";
import { messagesRes } from "@core/message";

async function loginWithUsernamePassword(req,res) {
    const body = req.body;
    if (body.username === 'admin' && body.password === '123') {
        res.status(200).send(messagesRes(200,"Login sucessfully",{
            token : createJWT(body.username)
        }));     
    } else {
        res.status(403).send(messagesRes(403,"Permission denied! Invalid username and password"));
    }
}

export default errorHandler({ loginWithUsernamePassword });
