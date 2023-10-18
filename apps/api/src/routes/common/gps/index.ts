import express, { Router } from "express";
import createGPS from "./controllers/create-gps.controller";
import getGPS from "./controllers/get-gps.controller";
import deleteGPS from "./controllers/delete.gps.controller";
import updateVehicle from "./controllers/update-gps.controller";

const router: Router = express.Router();

router.post("/", createGPS);
router.get("/", getGPS);
router.delete("/:id", deleteGPS);
router.put("/:id", updateVehicle);

export default router;
