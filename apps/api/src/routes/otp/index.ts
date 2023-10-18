import { Router } from "express";
import createOtp from "./controller/create-otp";
import updateOtp from "./controller/update-otp";

const route = Router();

route.post("/", createOtp);
route.patch("/verify", updateOtp);

export default route;
