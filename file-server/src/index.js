import compression from "compression";
import cors from "cors";
import express from "express";
import httpContext from "express-http-context";
import helmet from "helmet";
import morgan from "morgan";
import {
  APP_HOST,
  APP_PORT,
  BASE_URL,
  IMMEDIATE_LOG_FORMAT,
  LOG_FORMAT,
} from "./configs/configs.js";
import "./env.js";
import { startEurekaClient } from "./eureka-client.js";
import initializer from "./initializer.js";
import routes from "./routes.js";
import logger, { logStream } from "./utils/logger.js";

initializer().then(() => {
  const app = express();

  app.set("port", APP_PORT);
  app.set("host", APP_HOST);
  app.locals.title = process.env.APP_NAME;
  app.locals.version = process.env.APP_VERSION;

  app.use(cors());
  app.use(helmet());
  app.use(compression());

  app.use(httpContext.middleware);

  app.use(express.json());

  app.use(
    morgan(IMMEDIATE_LOG_FORMAT, {
      immediate: true,
      stream: logStream,
    })
  );
  app.use(
    morgan(LOG_FORMAT, {
      stream: logStream,
    })
  );

  // API Routes
  app.use(BASE_URL, routes);

  app.listen(app.get("port"), app.get("host"), () => {
    // Start the Eureka client
    startEurekaClient();
    
    logger.info(
      `Server started at http://${app.get("host")}:${app.get(
        "port"
      )}${BASE_URL}`
    );
  });
});
