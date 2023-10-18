import { config as configDotenv } from "dotenv";
import { resolve } from "path";
configDotenv({
  path: resolve(__dirname, "../../src/.env"),
});

switch (process.env.NODE_ENV) {
  case "development":
    console.log("Environment is 'development'");
    configDotenv({
      path: resolve(__dirname, "../../src/.env.dev"),
    });
    break;
  case "production":
    console.log("Environment is 'production'");

    configDotenv({
      path: resolve(__dirname, "../../.env.prod"),
    });
    break;
  case "test":
    configDotenv({
      path: resolve(__dirname, "../../.env.test"),
    });
    break;
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}
