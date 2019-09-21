const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
import routes from "@routes";
import {
    sentryMiddleware,
    morganMiddleware
} from "@middlewares/logging.middleware";
import Configuration from "@core/config";
const app = express();
const server = require("http").Server(app);
//load Config
import swaggerJSDoc from 'swagger-jsdoc'
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');


const swaggerDefinition = {
    info: {
        title: 'Counter Swagger API',
        version: '1.0.0',
        description: 'SWD',
    },
    host: 'localhost:3333',
    basePath: '/',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'Bearer ',
            in: 'header',
        },
    },
};
const options = {
    swaggerDefinition,
    apis: ['./routes/*.route.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
async function main(app, server) {
    const PORT = Configuration.PORT;
    const HOST = Configuration.HOST;
    try {
        // console.log(sequelize);

        // sequelize.authenticate().then(() => {
        //     console.log("DB sound good!");
        // }).catch((err) => {
        //     console.log(err);
        //     console.log("DB don't feel so good");
        // })
        // checkEnvLoaded();
        sentryMiddleware();
        app.use(morganMiddleware);

        //compession gzip
        app.use(compression());

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use("/api", routes);
        app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        server.listen(PORT, () => console.log(`API running at http://${HOST}:${PORT}/api`))
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main(app, server);