import express, { Router } from "express";
import createVehicle from "./controllers/create-vehicle.controller";
import getVehicle from "./controllers/get-vehicle.controller";
import deleteVehicle from "./controllers/delete-vehicle.controller";
import updateVehicle from "./controllers/update-vehicle.controller";

const router: Router = express.Router();

// auth routes
router.post("/", createVehicle);
router.get("/", getVehicle);
router.delete("/:id", deleteVehicle);
router.put("/:id", updateVehicle);

export default router;
