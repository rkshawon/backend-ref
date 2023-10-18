import { Router } from "express";
import Controller from "./controllers"

const route = Router();


route.get("/", Controller.getMyOrders);
route.post("/delivery",Controller.outForDelivery)
route.post("/:orderId/delivered",Controller.OrderDeliveredByTransporter)




export default route;
