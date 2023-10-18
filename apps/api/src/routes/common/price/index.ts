import express, { Router } from "express";
import createPrice from "./create-price.controller";
import deletePrice from "./delete.controller";
import getPrices from "./get.controller";
import updatePrice from "./update.controller";

const router: Router = express.Router();

// auth routes
router.post("/", createPrice);
router.get("/", getPrices);
router.put("/:priceId", updatePrice);
router.delete("/:priceId", deletePrice);

export default router;