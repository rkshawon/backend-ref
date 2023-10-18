import { Router } from "express";
import autosuggestions from "./autosuggestions";
import listProducts from "./list-products";
import productBySlug from "./product-by-slug";

const route = Router();

route.get("/", listProducts);
route.get("/autosuggestions", autosuggestions);
route.get("/search/", listProducts);
route.get("/:slug", productBySlug);


export default route;
