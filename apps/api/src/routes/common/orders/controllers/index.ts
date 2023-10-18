import myOrder from "./my-orders.controller";
import receivedOrders from "./received-order.controller";
import updateOrder from "./update-order.controller";
import createOrder from "./create-order.controller";
import deleteOrder from "./delete-order.controller";
import getOrderById from "./get-orderById.controller";
import getOrderByIdEvent from "./getOrderByIdEvent.controller";
import createOrderEvent from "./createOrderEvent.controller";
import createTransport from "./create-Transport";
import OrderConfirm from "./order-confirm.controller";
import getTransportByOrderId from "./getTransportByOrderId.controller";
import OrderDelivered from "./order-delivered.controller";
import OrderTransport from "./order-transport.controller";

const orderController = {
  myOrder,
  receivedOrders,
  updateOrder,
  createOrder,
  deleteOrder,
  getOrderById,
  getOrderByIdEvent,
  createOrderEvent,
  createTransport,
  OrderConfirm,
  getTransportByOrderId,
  OrderDelivered,
  OrderTransport,
};

export default orderController;
