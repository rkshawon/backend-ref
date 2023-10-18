import express, { Router } from "express";
import MetrcApiKeyRoute from "./apiKey";
import MetrcItemsRoute from "./items";

const router: Router = express.Router();

router.use("/api-key", MetrcApiKeyRoute);
router.use("/items", MetrcItemsRoute);

export default router;
