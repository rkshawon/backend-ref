import { Router } from "express";
import Users from "./users";

class AdminRoutes {
  public router = Router();
  private userRoute = new Users().router;

  constructor() {
    this.initRoute();
  }

  initRoute() {
    this.router.use("/users", this.userRoute);
  }
}

export default AdminRoutes;
