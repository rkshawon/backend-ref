import { Request, Response, NextFunction } from "express";
import productsModel from "../../../../models/products.model";
import mongoose from "mongoose";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedInUser: any = req.user;

    let product_query: any = {
      "company.id": new mongoose.Types.ObjectId(loggedInUser.company.id),
      is_deleted: false,
    };

    if (req.query) {
      const queries = Object.entries(req.query);
      queries.map((item) => {
        product_query[item[0]] = item[1];
      });
    }

    console.log("test");

    const products = await productsModel.find(product_query);

    console.log(loggedInUser.company.id, "products");

    res.send({
      status: true,
      products,
    });
  } catch (err) {
    next(err);
  }
};
