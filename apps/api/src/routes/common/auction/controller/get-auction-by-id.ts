import { NextFunction, Request, Response } from "express";
import Auction from "../../../../models/auction.model";
import Bid from "../../../../models/bid.model";
import Company from "../../../../models/companies.model";

const getByIdAuction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company }: any = req.user;

    const id = req.params.id;
    const auction = await Auction.findById(id)
      .populate({
        path: "product",
      })
      .lean();

    if (!auction) {
      return res.send({
        status: false,
        message: "auction not found",
      });
    }

    const bids = await Bid.find({ auction: auction?._id })
      .populate({
        path: "company",
        select: "first_name last_name business_logo",
      })
      .lean();

    const userBid = bids.find(
      (bid) => bid?.company?._id?.toString() === company?.id?.toString()
    );

    const data = {
      ...auction,
      bids,
      myBid: userBid,
    };

    res.send({
      status: true,
      auction: data,
    });
  } catch (err) {
    next(err);
  }
};

export default getByIdAuction;
