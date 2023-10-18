import { Router } from "express"
import products from "./products"

const route = Router();

route.use("/inventory/product",products);

export default route;