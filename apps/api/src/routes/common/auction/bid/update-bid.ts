import { NextFunction, Request, Response } from "express";
import Bid from "../../../../models/bid.model";
import Notification from "../../../../models/notification.model";

const updateBid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company }: any = req.user;
    const id = req.params.id;
    const data = await Bid.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!data) {
      return res.send({
        status: true,
        message: "Bid was not found",
      });
    }

    await Notification.create({
      sender: company.id,
      receiver: data.company,
      text: `Bid for auction <strong> #${data.auction} </strong> was updated. New bid <strong> $${req.body} </strong> .`,
      link: `/auctions/products/${data.auction}`,
    });

    res.send({
      status: true,
      message: "Bid is updated successfully",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

export default updateBid;
