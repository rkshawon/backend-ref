import express, { Router } from "express";
import createAuction from "./controller/create-auction";
import getAuction from "./controller/get-auction";
import getMyAuction from "./controller/get-my-auction";
import getByIdAuction from "./controller/get-auction-by-id";
import updateAuction from "./controller/update-auction";
import deleteAuction from "./controller/delete-auction";

import createBid from "./bid/create-bid";
import getBidByCompany from "./bid/get-bid-bycomapny";
import getBidByAuctionId from "./bid/get-bid-by-auctionid";
import updateBid from "./bid/update-bid";
import deleteBid from "./bid/delete-bid";

import createAward from "./controller/create-award";
import createBuyNow from "./controller/create-buy-now";

const router: Router = express.Router();
//auction
router.post("/", createAuction);
router.get("/", getAuction);
router.get("/myauctions", getMyAuction);
router.get("/:id", getByIdAuction);
router.put("/:id", updateAuction);
router.delete("/:id", deleteAuction);

//Bid
router.post("/:id/bid", createBid);
router.get("/bid/company", getBidByCompany);
router.get("/:id/bid", getBidByAuctionId);
router.put("/:id/bid", updateBid);
router.delete("/:id/withdraw", deleteBid);

//award

router.post("/:id/award", createAward);

//buy-now
router.post("/:id/buy-now", createBuyNow);

export default router;
