import { NextFunction, Request, Response } from "express";
import Auction from "../../../../models/auction.model";
import { ObjectId } from "mongodb";

const getMyAuction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company }: any = req.user;
    const auctions = await Auction.aggregate([
      {
        $match: {
          company: new ObjectId(company?.id),
        },
      },
      {
        $lookup: {
          from: "bids",
          localField: "_id",
          foreignField: "auction",
          as: "total_bids_received",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
        },
      },
      {
        $project: {
          product: "$product.title",
          total_bids_received: {
            $size: "$total_bids_received",
          },
          total_quantity: 1,
          start_date: 1,
          end_date: 1,
          duration: 1,
          reserve_price: 1,
          buy_now_price: 1,
          createdAt: 1,
          company: 1,
          status: 1,
          active_status: {
            $cond: {
              if: { $lt: ["$start_date", new Date()] },
              then: {
                $cond: {
                  if: { $lt: ["$end_date", new Date()] },
                  then: "ended",
                  else: "live",
                },
              },
              else: "upcoming",
            },
          },
        },
      },
      {
        $sort: {
          createdAt: -1, // Use 1 for ascending order, -1 for descending order
        },
      },
    ]);

    res.send({
      status: true,
      auctions,
    });
  } catch (err) {
    next(err);
  }
};

export default getMyAuction;
