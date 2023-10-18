import mongoose from "mongoose";
import PriceServices from "../../../services/price";
import { NextFunction, Request, Response } from "express";

const updatePrice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (typeof req.params["priceId"] === "string") {
      const order = await PriceServices.updatePrice(
        new mongoose.Types.ObjectId(req.params["priceId"]),
        req.body
      );
      res.status(201).send({
        status: true,
        order,
        message: "Price updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default updatePrice;
