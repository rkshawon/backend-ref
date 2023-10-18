import express, { Router } from "express";
import Controller from "./controllers";

const router: Router = express.Router();

router.get("/", Controller.getMetrcItems);

export default router;
