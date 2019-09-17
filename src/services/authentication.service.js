import errorHandler from "@core/error.handler";

async function loginWithUsernamePassword(req,res) {
    const body = req.body;

    console.log(body);
    res.status(200).send({ body : "123" });
}

export default errorHandler({ loginWithUsernamePassword });
