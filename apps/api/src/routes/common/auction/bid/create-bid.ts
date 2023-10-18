import { NextFunction, Request, Response } from "express";
import Bid from "../../../../models/bid.model";
import Notification from "../../../../models/notification.model";

const createBid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company }: any = req.user;
    const { id } = req.params;

    const bidAmount: number = req.body.bid_amount;

    if (typeof bidAmount !== "number" || isNaN(bidAmount) || bidAmount <= 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid bid amount",
      });
    }

    const data = {
      ...req.body,
      company: company.id,
      auction: id,
    };

    const createdAuction = await Bid.create(data);

    await Notification.create({
      sender: company.id,
      receiver: createdAuction.company,
      text: `Someone bid <strong> $${req.body.bid_amount} </strong> in your auction <strong> #${id} </strong> .`,
      link: `/auctions/products/${id}`,
    });

    res.send({
      status: true,
      message: "Bid is created successfully",
      data: createdAuction,
    });
  } catch (err) {
    next(err);
  }
};

export default createBid;
