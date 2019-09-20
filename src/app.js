const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
require('dotenv').config()
import routes from "@routes";
import {
    sentryMiddleware,
    morganMiddleware
} from "@middlewares/logging.middleware";
import sequelize from "@models/index";
import Configuration from "@core/config";
const app = express();
const server = require("http").Server(app);
//load Config

async function main(app, server) {
    const PORT = Configuration.PORT;
    const HOST = Configuration.HOST;
    try {
        console.log(sequelize.models);
        
        sequelize.sync().then(() => {
            console.log("DB sound good!");
        }).catch((err) => {
            console.log(err);
            console.log("DB don't feel so good");
        })
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