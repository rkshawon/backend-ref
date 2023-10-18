import { Router } from "express";
import getAllCompanies from "./get-companies";
import updateCompany from "./update-company";
import deleteCompany from "./delete-company";
import searchCompanies from "./search-company";
import getFilteredCompanies from "./filter-companies";
import getCompanyById from "./get-company-by-id";
import verifyCompany from "./verify-company";

class AdminCompaniesRoute {
  public router = Router();

  constructor() {
    this.initRoute();
  }

  initRoute() {
    this.router.put("/:id", updateCompany);
    this.router.delete("/:id", deleteCompany);
    this.router.get("/", getAllCompanies);
    this.router.get("/:id",  getCompanyById);
    this.router.get("/search", searchCompanies);
    this.router.get("/filter", getFilteredCompanies);
    this.router.patch("/verify/:company_id", verifyCompany);

  }
}

export default AdminCompaniesRoute;
