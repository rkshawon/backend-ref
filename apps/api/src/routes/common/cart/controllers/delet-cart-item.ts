import { NextFunction, Request, Response } from "express";
import { Interface } from "readline";
import Cart from "../../../../models/cart.model";
import productsModel from "../../../../models/products.model";
import ApiError from "../../../../utils/http.error";
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
    const product = await productsModel.findById(req.params.productId);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    await Cart.findOneAndUpdate(
      {
        user: user_id,
        company: company.id,
      },
      {
        $pull: {
          product_list: {
            product: req.params.productId,
          },
        },
      }
    );

    res.status(200).send({
      message: "item deleted successfully ",
    });
  } catch (err) {
    next(err);
  }
};
