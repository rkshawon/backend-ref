import express, { Router } from "express";
import MessageRoute from "./messages"
import Controllers from "./controllers"

/*
endpoint : {{baseURL}}/api/v1/{license_type}/rooms/
license_type: grower, 
*/

const router: Router = express.Router();

router.post("/", Controllers.createRoom);
router.get("/", Controllers.getAllRooms);
router.get("/list/products/:product_id",Controllers.productRoomList );


// Message Routes
router.use("/messages/", MessageRoute);



export default router;
