const express = require("express");
const compression = require("compression");
const routes = require("@routes");
const bodyParser = require("body-parser");
import {
    sentryMiddleware,
    morganMiddleware
} from "@middlewares/logging.middleware";
const app = express();
const PORT = 3333;

const server = require("http").Server(app);
async function main(app, server) {
    try {
        // checkEnvLoaded();
        sentryMiddleware();
        app.use(morganMiddleware);

        //compession gzip
        app.use(compression());


        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        // app.use("/api/v1", routes);
        app.listen(PORT, () => console.log(`API running at ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

main(app, server);