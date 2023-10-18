import { NextFunction, Request, Response } from "express";
import Auction from "../../../../models/auction.model";

const getAuction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, product } = req.query;
    const { company }: any = req.user;

    let query = {};

    if (status === "live") {
      query = {
        start_date: { $lte: new Date() },
        end_date: { $gte: new Date() },
        company: { $ne: company?.id },
        status: "pending",
      };
    } else if (status === "upcoming") {
      query = {
        start_date: { $gt: new Date() },
        company: { $ne: company?.id },
        status: "pending",
      };
    } else if (product) {
      query = { product };
    } else {
      query = { company: { $ne: company?.id } };
    }

    const auctions = await Auction.find(query).populate("product");

    res.send({
      status: true,
      auctions,
    });
  } catch (err) {
    next(err);
  }
};

export default getAuction;
