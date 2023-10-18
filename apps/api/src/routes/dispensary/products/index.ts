import { Router } from "express";
import listProducts from "./list-products";
import createProduct from "./create-product"
import updateProduct from "./update-product";
import deleteProduct from "./delete-product"

const route = Router();


route.get("/",listProducts);
route.post("/",createProduct);
route.put("/",updateProduct);
route.delete("/",deleteProduct);



export default route;