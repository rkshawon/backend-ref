import express, { Router } from "express";
import createDeliverySchedule from "./controllers/create-delivery-schedule";
import getDeliverySchedule from "./controllers/get-delivery-schedule";
import deleteDeliverySchedule from "./controllers/delete-delivery-schedule";
import updateDeliverySchedule from "./controllers/update-delivery-schedule";
import updateDeliveryOrderStatus from "./controllers/update-order-status";
import getUpcomingTrips from "./controllers/get-upcoming-trips";
import getAllDeliveryScheduleWithMetrc from "./controllers/get-all-delivery-schedule-with-metrc";
import updateMetrcStatus from "./controllers/update-metrc-status";

const router: Router = express.Router();

router.post("/", createDeliverySchedule);
router.get("/", getDeliverySchedule);
router.get("/metrc", getAllDeliveryScheduleWithMetrc);
router.put("/metrc/:id", updateMetrcStatus);
router.get("/upcomingtrips/:id", getUpcomingTrips);
router.put("/delivered/:id", updateDeliveryOrderStatus);
router.put("/:id", updateDeliverySchedule);
router.put("/:id", updateDeliverySchedule);
router.delete("/:id", deleteDeliverySchedule);

export default router;
