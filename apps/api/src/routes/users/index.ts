import { Router } from "express";
import UsersCompaniesRoute from "./companies";
import User from "./user"

class UserRoutes {
  public router = Router();

  private companies=new UsersCompaniesRoute().router;
  private user = new User().router;

  constructor() {
    this.router.use("/",this.user);
    this.router.use("/companies",this.companies);



  }
}

export default UserRoutes;
