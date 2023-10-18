import { Router } from "express";
import Controller from "./controllers";

const route = Router();

route.post("/", Controller.createOrder);
route.get("/received", Controller.receivedOrders);
route.get("/", Controller.myOrder);
route.get("/:id", Controller.getOrderById);
route.put("/:orderId", Controller.updateOrder);
route.delete("/:orderId", Controller.deleteOrder);

// Order status
route.post("/:orderId/confirm", Controller.OrderConfirm);
route.post("/:orderId/delivered", Controller.OrderDelivered);
route.post("/:orderId/transport", Controller.OrderTransport);

//Transport
route.get("/:orderId/transport", Controller.getTransportByOrderId);
route.post("/:orderId/transport", Controller.createTransport);
route.post("/:orderId/transport/:driver", Controller.createTransport);

// Transport

route.get("/:id/timeline", Controller.getOrderByIdEvent);
route.post("/:id/timeline", Controller.createOrderEvent);

export default route;
