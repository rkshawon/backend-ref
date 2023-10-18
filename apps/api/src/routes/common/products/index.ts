import { Router } from "express";
import Controller from "./controllers"

const route = Router();

route.get("/",Controller.listProducts);
route.get("/:product_id",Controller.getProductById);
route.get("/complete/search",Controller.searchProducts);
route.post("/",Controller.createProduct);
route.put("/:product_id",Controller.updateProduct);
route.delete("/:product_id",Controller.deleteProduct);



export default route;