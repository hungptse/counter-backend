import errorHandler from "@core/error.handler";
import { createJWT } from "@core/jwt";
import { messagesRes } from "@core/message";

async function testFunctionWithJWT(req,res) {
    res.status(200).send(messagesRes(200,"Test sucessfully with docker-compose",));   
}

export default errorHandler({ testFunctionWithJWT });
