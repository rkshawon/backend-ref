import { Router } from "express";
import updateCompany from "./update-company";
import getUserCompany from "./get-company";
class UsersCompaniesRoute {
  public router = Router();

  constructor() {
    this.initRoute();
  }

  initRoute() {
    this.router.get("/:company_id", getUserCompany);

    this.router.put("/", updateCompany);
  }
}

export default UsersCompaniesRoute;
