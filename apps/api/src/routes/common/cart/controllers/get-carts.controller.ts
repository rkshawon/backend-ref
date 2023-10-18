import { NextFunction, Request, Response } from "express";
import { Interface } from "readline";
import Cart from "../../../../models/cart.model";

import { Types } from "mongoose";
import IProduct from "../../../../interface/IProduct.interface";

export interface ICartProduct {
  product: Types.ObjectId;
  quantity: Number;
  unit: String;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company, _id: user_id }: any = req.user;

    const cart = await Cart.findOne({
      user: user_id,
      company: company.id,
    }).populate("product_list.product").lean();

    if (!cart) {
      const emptyCart={
        product_list:[],
        // ...calculateCartTotal([]),
      }
      return res.send(emptyCart)
    }
    // const cartTotal= calculateCartTotal(cart.product_list)

    const cart_body={
      ...cart,
      // ...cartTotal,
      // total_price:cartTotal.total_lb_price+cartTotal.total_gram_price
      

    }


    res.send(cart_body);
  } catch (err) {
    console.log(err)
    next(err);
  }
};

// Calcuate Total, Subtotal
// function calculateCartTotal(products:any){
//   let total_value = products.reduce((acc:any,curr:any)=>{
//     if(curr.unit==="g"){
//         acc.total_gram_weight=curr.quantity;
//         acc.total_gram_price=curr.product.price_per_g*curr.quantity
//         acc.total_gram_count+=1;
//     }
//     if(curr.unit==="lb"){
//       acc.total_lb_weight=curr.quantity
//       acc.total_lb_price=curr.product.price_per_lb*curr.quantity
//       acc.total_lb_count+=1;
//     }

//     acc.item_count+=1;

//     return acc;
//   },{
//     total_gram_price:0,
//     total_lb_price:0,
//     total_gram_weight:0,
//     total_lb_weight:0,
//     total_gram_count:0,
//     total_lb_count:0,
//     discount:0,
//     item_count:0
//   })

//   return total_value;

// }
