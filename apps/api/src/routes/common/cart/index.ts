import express, { Router } from "express";
import Controller from "./controllers";

const router: Router = express.Router();


router.post("/", Controller.addToCart);

router.get("/", Controller.getCart);

router.put("/", Controller.updateCartItem);

router.delete("/:productId", Controller.deleteCartItem);


export default router;
