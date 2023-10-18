import { Router } from "express";

import setPassword from "./set-password";
import login from "./user-login";

class AuthRoutes {
  public router = Router();

  constructor() {
    this.initRoute();
  }

  initRoute() {
    this.router.post(
      "/login",
      login
    );
    this.router.put("/set-password/:token", setPassword);
  }
}

export default AuthRoutes;
