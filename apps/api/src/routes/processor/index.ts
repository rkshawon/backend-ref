import { Router } from "express"
import products from "./products"

const route = Router();

route.use("/inventory/product",products);
route.use("/order",products);


export default route;