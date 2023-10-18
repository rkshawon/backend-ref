import express, { Router } from "express";
import Controller from "./controllers";

const router: Router = express.Router();

router.get("/", Controller.getMetrcAPiKey);
router.post("/", Controller.createMetrcAPiKey);
router.put("/", Controller.updateMetrcAPiKey);
router.delete("/", Controller.deleteMetrcAPiKey);

export default router;
