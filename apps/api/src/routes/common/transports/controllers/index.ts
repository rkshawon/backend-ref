import getMyOrders from "./myOrders";
import outForDelivery from "./out-for-delivery.controller";
import OrderDeliveredByTransporter from "./delivered.controller";
const TransportController={
    getMyOrders,
    outForDelivery,
    OrderDeliveredByTransporter
}


export default TransportController;