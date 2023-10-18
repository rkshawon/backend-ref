import { Router } from "express";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import AdminRoutes from "./admin";
import AuthRoutes from "./auth";
import CompaniesRoute from "./companies/";
import GrowerRoutes from "./grower/index";
import SuperAdminRoutes from "./superadmin";
import FacilitiesRoute from "./facilities/";
import UserRoutes from "./users";
import OTPRoutes from "./otp";

class ProtectedRoutes {
  public router = Router();
  private superAdminRoutes = new SuperAdminRoutes().router;
  private adminRoute = new AdminRoutes().router;
  private userRoutes = new UserRoutes().router;

  constructor() {
    this.router.use("/superadmin", this.superAdminRoutes);
    this.router.use(
      "/users",
      passport.authenticate("jwt", { session: false }),
      this.userRoutes
    );
    this.router.use(
      "/admin",
      passport.authenticate("jwt", { session: false }),
      this.adminRoute
    );

    this.router.use(
      "/growers",
      passport.authenticate("jwt", { session: false }),
      GrowerRoutes
    );
    this.router.use(
      "/dispensaries",
      passport.authenticate("jwt", { session: false }),
      GrowerRoutes
    );
    this.router.use(
      "/processors",
      passport.authenticate("jwt", { session: false }),
      GrowerRoutes
    );
  }
}

class PublicRoutes {
  public router = Router();
  private comapnyRoutes = new CompaniesRoute().router;
  private authRoute = new AuthRoutes().router;
  private FacilityRoute = new FacilitiesRoute().router;

  constructor() {
    this.router.use("/auth", this.authRoute, swaggerUi.serve);
    this.router.use("/companies", this.comapnyRoutes);
    this.router.use("/facilities", this.FacilityRoute);
    this.router.use("/otp", OTPRoutes);
  }
}

export { ProtectedRoutes, PublicRoutes };
