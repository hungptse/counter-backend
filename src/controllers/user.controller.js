import errorHandler from '@core/error.handler'
import { messagesRes } from '@core/message'

async function getUserInfomation(req, res) {
    const permissions = req['permissions'];
    const user = req['user'];
    res.status(200).send(messagesRes(200, "OK",{
        granted_permission : permissions,
        info : user
    }));
}

async function getUsersList(req,res) {
    
}

export default errorHandler({ getUserInfomation });
