import { Router } from "express";
import Controller from "./controllers"

class Users {
  public router = Router();
  constructor() {
    this.initRoute();
  }

  initRoute() {
    this.router.put("/", Controller.updateUser);
  }
}

export default Users;
