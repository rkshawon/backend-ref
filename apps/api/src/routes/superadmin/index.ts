import { Router } from "express";
import AdminCompaniesRoute from "./companies";
import AdminUserServices from "./users";

class SuperAdminRoutes {
  public router = Router();
  private comapnyRoutes = new AdminCompaniesRoute().router;
  private userRoutes = new AdminUserServices().router;

  constructor() {
    this.router.use("/companies", this.comapnyRoutes);
    this.router.use("/users", this.userRoutes);

  }
}

export default SuperAdminRoutes;
