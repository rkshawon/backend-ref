import cors from "cors";
import "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import passport from "passport";
import MongooseConnect from "./config/mongodb.config";
import middleware from "./middlewares";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import "./utils/passport";
import { swaggerSpec } from "./utils/swagger";
const swaggerUI = require("swagger-ui-express");

class CannabisConnector {
  public app: Express;
  constructor() {
    this.app = express();
    this.applicationInt();
    this.connectMongoDb();
    this.ProtectedRoutes();
    this.PublicRoutes();
    this.ErrorHandlers();
    this.PassportInitialization();
    // this.OrderRoutes()
    // this.CartRoutes()
    this.SwaggerRoutes()
  }

  private applicationInt(): void {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }
  private ProtectedRoutes(): void {
    this.app.use("/api/v1", new ProtectedRoutes().router);
  }
  private PublicRoutes(): void {
    this.app.use("/api/v1", new PublicRoutes().router);
  }

  private ErrorHandlers(): void {
    this.app.use(middleware.errorMiddleware);
  }

  private SwaggerRoutes():void{
    this.app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec))
  }
  private PassportInitialization(): void {
    this.app.use(passport.initialize());
  }
  private connectMongoDb(): void {
    MongooseConnect();
  }
}

export default CannabisConnector;
