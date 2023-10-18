import { Router } from "express";
import Controllers from "./controllers";

class AdminRoutes {
  public router = Router();

  constructor() {
    this.initRoute();
  }

  initRoute() {
    this.router.post("/", Controllers.addUser);
    this.router.get("/", Controllers.getUsers);
    this.router.get("/drivers", Controllers.getDrivers);
    this.router.put("/:user_id", Controllers.updateUser);
    this.router.delete("/:user_id", Controllers.deleteUser);
  }
}

export default AdminRoutes;
