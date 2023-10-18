import { NextFunction, Request, Response } from "express";
import Bid from "../../../../models/bid.model";
import Auction from "../../../../models/auction.model";

const getBidByAuctionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const bids = await Bid.find({ auction: id })
      .populate({
        path: "company",
      })
      .lean();

    const auction = await Auction.findById(id).select("status winner").lean();

    res.send({
      status: true,
      bids,
      ...auction,
    });
  } catch (err) {
    next(err);
  }
};

export default getBidByAuctionId;
