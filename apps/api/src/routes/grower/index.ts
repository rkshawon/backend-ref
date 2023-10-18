import { Router } from "express";
import {
  ProductsRoutes,
  MarketplacRoutes,
  AuctionRoutes,
  RoomRoutes,
} from "../common";
import OrderRoutes from "../common/orders/";
import PriceRoutes from "../common/price";
import CartRoutes from "../common/cart";
import SubscriptionRoutes from "../common/subscription";
import TransportRoute from "../common/transports";
import MetrcRoute from "../common/metrc";
import NotificationsRoute from "../common/notifications";
import VehicleRoute from "../common/vehicles";
import DeliverySchedule from "../common/deliverySchedule";
import GPS from "../common/gps";
import Auction from "../common/auction";

const route = Router();

route.use("/inventory/products", ProductsRoutes);
route.use("/orders", OrderRoutes);
route.use("/carts", CartRoutes);
route.use("/inventory/prices", PriceRoutes);
route.use("/marketplace/products", MarketplacRoutes);
route.use("/auction/products", AuctionRoutes);
route.use("/rooms", RoomRoutes);
route.use("/subscription", SubscriptionRoutes);
route.use("/transports", TransportRoute);
route.use("/metrc", MetrcRoute);
route.use("/notifications", NotificationsRoute);
route.use("/vehicles", VehicleRoute);
route.use("/delivery/schedule", DeliverySchedule);
route.use("/gps", GPS);
route.use("/auctions", Auction);

export default route;
