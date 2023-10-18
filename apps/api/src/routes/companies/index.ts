import { Router } from "express";
import createCompany from "./create-company";

class CompaniesRoute {
  public router = Router();

  constructor() {
    this.initRoute();
  }

  initRoute() {
    this.router.post("/", createCompany);
  }
}

export default CompaniesRoute;
