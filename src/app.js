const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
import routes from "@routes";
import {
    sentryMiddleware,
    morganMiddleware
} from "@middlewares/logging.middleware";
const PORT = 3333;

const app = express();
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
        app.use("/api", routes);
        server.listen(PORT, () => console.log(`API running at ${PORT}`))
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main(app, server);