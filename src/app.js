const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
require('dotenv').config()
import routes from "@routes";
import {
    sentryMiddleware,
    morganMiddleware
} from "@middlewares/logging.middleware";
const app = express();
const server = require("http").Server(app);
//load Config

async function main(app, server) {
    const PORT = process.env.PORT;
    const HOST = process.env.HOST;
    try {
        // checkEnvLoaded();
        sentryMiddleware();
        app.use(morganMiddleware);

        //compession gzip
        app.use(compression());

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use("/api", routes);
        server.listen(PORT, () => console.log(`API running at http://${HOST}:${PORT}/api`))
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main(app, server);