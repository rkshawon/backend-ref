import { NextFunction, Request, Response } from "express";
import Cart from "../../../../models/cart.model";
import { Types } from "mongoose";
import productsModel from "../../../../models/products.model";
import ApiError from "../../../../utils/http.error";

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
    });

    const product = await productsModel.findById(req.body.product);

    if(!product){
      throw new ApiError(404,"Product not found")
    }

    if (!cart) {
      const new_cart = await Cart.create({
        user: user_id,
        company: company.id,
        product_list: {
          product: req.body.product,
          unit: req.body.unit,
          quantity: req.body.quantity,
        },
      });
      await new_cart.populate("product_list.product",["-allocations"])
      return res.send(new_cart);
    }

    const cart_product: Boolean | undefined = cart?.product_list.some(
      (item: ICartProduct) => {
        return item.product.equals(req.body.product);
      }
    );

    if (cart_product) {
      return res.status(409).send({
        message: "Product is already exist",
      });
    }

    // // Push new product Item

    const _cart = await Cart.findByIdAndUpdate(
      cart?._id,
      {
        $push: {
          product_list: {
            product: req.body.product,
            unit: req.body.unit,
            quantity: req.body.quantity,
          },
        },
      },
      {
        new: true,
      }
    );

    await _cart?.populate("product_list.product");

    res.send(product);
  } catch (err) {
    next(err);
  }
};
