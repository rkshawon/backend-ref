import express, { Router } from "express";
import Controller from "./controllers";

const router: Router = express.Router();

router.get("/", Controller.Subscribe);
router.post("/events", Controller.createEvent);







export default router;
