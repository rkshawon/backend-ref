import listProducts from "./list-products";
import createProduct from "./create-product"
import updateProduct from "./update-product";
import deleteProduct from "./delete-product";
import searchProducts from "./search-products";
import getProductById from "./get-productById";


const ProductController={
    listProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductById
}

export default ProductController;