import addToCart from "./add-to-cart.contollers";
import getCart from "./get-carts.controller"
import updateCartItem from "./update-cart-item.controller"
import deleteCartItem from "./delet-cart-item"



const CartController={
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem
}
export default CartController;