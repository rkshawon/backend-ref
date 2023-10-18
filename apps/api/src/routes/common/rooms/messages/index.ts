import express, { Router } from "express";
import Controller from "./controllers";

const router: Router = express.Router();

router.post("/", Controller.createMessage);
router.get("/:room_id", Controller.roomMessages);
router.get("/:room_id/subscribe", Controller.subscribe);





export default router;
