import { Router } from "express";
import createUser from "./create-user";
import deleteUser from "./delete-user";
import getUserById from "./get-user";
import getUsers from "./get-users";
import updateUser from "./update-user";

class AdminUserRoutes {
  public router = Router();

  constructor() {
    this.initRoute();
  }

  initRoute() {
    this.router.post("/", createUser);
    this.router.get("/all", getUsers);
    this.router.get("/me/", getUserById);
    this.router.put("/:id", updateUser);
    this.router.put("/delete/:id", deleteUser);
  }
}

export default AdminUserRoutes;
