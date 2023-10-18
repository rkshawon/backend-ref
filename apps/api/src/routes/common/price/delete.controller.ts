import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import PriceService from "../../../services/price";

const deletePrice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (typeof req.params["priceId"] === "string") {
      await PriceService.deletePrice(
        new mongoose.Types.ObjectId(req.params["priceId"])
      );
      res.status(201).send({
        status: true,
        message: "Price deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default deletePrice;
