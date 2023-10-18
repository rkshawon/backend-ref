import { Router } from "express";
import Controller from "./controllers"

const route = Router();

route.get("/",Controller.getNotifications);
route.post("/read",Controller.readNotifications);





export default route;