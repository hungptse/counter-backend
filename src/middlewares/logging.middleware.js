import * as sentry from "@sentry/node";
import morgan from "morgan";

export function sentryMiddleware() {
    sentry.init({
        dsn: "https://befbee011ba3425c8b4a6b5f2ac05ba5@sentry.io/1728498"
    });
}

export const morganMiddleware = morgan("tiny");