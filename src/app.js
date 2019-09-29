const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
//load Config
import swaggerJSDoc from 'swagger-jsdoc'
const swaggerUi = require('swagger-ui-express');
import sequelize from "@models";
// const swaggerDocument = require('./swagger.json');
import routes from "@routes";
import {
    sentryMiddleware,
    morganMiddleware
} from "@middlewares/logging.middleware";
import corsMiddleware from '@middlewares/cors.middleware';
import Configuration from "@core/config";

const app = express();
const server = require("http").Server(app);

const swaggerDefinition = {
    info: {
        title: 'Counter Swagger API',
        version: '1.0.0',
        description: 'SWD',
    },
    host: 'localhost:3000',
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
        // console.log(sequelize.sequelize.sync());
        if (process.env.NODE_ENV === 'production') {
            await sequelize.sequelize.sync();
        }

        // sequelize.authenticate().then(() => {
        //     console.log("DB sound good!");
        // }).catch((err) => {
        //     console.log(err);
        //     console.log("DB don't feel so good");
        // })
        sentryMiddleware();
        app.use(morganMiddleware);

        app.use(corsMiddleware);
        //compession gzip
        app.use(compression());

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use("/api", routes);
        app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        server.listen(PORT, () => console.log(`API running at http://${HOST}:${PORT}/api`));        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
main(app, server);