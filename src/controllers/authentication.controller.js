import errorHandler from "@core/error.handler";
import { createJWT } from "@core/jwt";
import { encryptPassword,checkPassword } from "@core/bcrypt";
import { messagesRes } from "@core/message";

async function loginWithUsernamePassword(req,res) {
    const body = req.body;
    const isMatch = await checkPassword(body.password,"$2b$10$WqbaCP2C6bVJknWVHG5MAOEWwFqMWI5lwl.y1iFf04KfwUY1Adm3C");
    if (body.username === 'admin' && isMatch) {
        res.status(200).send(messagesRes(200,"Login sucessfully",{
            token : createJWT(body.username)
        }));     
    } else { 
        res.status(200).send(messagesRes(403,"Permission denied! Invalid username and password"));
    }
}

async function registerWithUsernamePassword(req,res) {
    const body = req.body;
    console.log(encryptPassword(body.password));
    res.status(200).send({ ok : "OK"});
    // await encryptPassword(body.password);
    // if (body.username === 'admin' && body.password === '123') {
    //     res.status(200).send(messagesRes(200,"Login sucessfully",{
    //         token : createJWT(body.username)
    //     }));     
    // } else {
    //     res.status(403).send(messagesRes(403,"Permission denied! Invalid username and password"));
    // }
}

export default errorHandler({ loginWithUsernamePassword, registerWithUsernamePassword });
