import { NextFunction, Request, Response } from "express";
import { Interface } from "readline";
import Cart from "../../../../models/cart.model";

import { Types } from "mongoose";

export interface ICartProduct {
  product: Types.ObjectId;
  quantity: Number;
  unit: String;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company, _id: user_id }: any = req.user;

    const cart = await Cart.findOneAndUpdate(
      {
        user: user_id,
        company: company.id,
        "product_list.product": req.body.product,
      },
      {
        $set: {
          "product_list.$.product": req.body.product,
          "product_list.$.unit": req.body.unit,
          "product_list.$.quantity": req.body.quantity,
        },
      },
      {
        new: true,
      }
    );


    let product = cart?.product_list.find((item) => {
     if( item.product._id.equals(req.body.product)){
      return item;
     }
    });

    res.send(product);
  } catch (err) {
    next(err);
  }
};
