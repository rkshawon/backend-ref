import { Request, Response, NextFunction } from "express";
import productsModel from "../../../../models/products.model";
import mongoose from "mongoose";
import Auction from "../../../../models/auction.model";
import IProduct from "../../../../interface/IProduct.interface";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedInUser: any = req.user;

    let product_query: any = {
      "company.id": new mongoose.Types.ObjectId(loggedInUser.company.id),
      _id: new mongoose.Types.ObjectId(req.params.product_id),
      is_deleted: false,
    };

    if (req.query) {
      const queries = Object.entries(req.query);
      queries.map((item) => {
        product_query[item[0]] = item[1];
      });
    }

    const product = await productsModel.findOne(product_query).lean();

    if (!product) {
      return res.send({
        status: false,
        message: "Product not found",
      });
    }

    const auctions = await Auction.find(product._id);

    product.allocations = { ...product.allocations, auction: auctions };

    res.send({
      status: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};
