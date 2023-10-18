import { Router } from "express";
import listAuctions from "./list-auctions";


const route = Router();


route.get("/",listAuctions);






export default route;