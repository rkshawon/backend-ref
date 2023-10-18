import { NextFunction, Request, Response } from "express";
import Auction from "../../../../models/auction.model";

const updateAuction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const { start_date, duration } = req.body;

    if (!start_date || !duration) {
      return res.status(400).json({
        status: false,
        message: "Both start_date and duration are required fields.",
      });
    }

    const startTimeObj = new Date(start_date);

    const endTimeObj = new Date(startTimeObj.getTime() + duration * 60000);

    const data = {
      ...req.body,
      end_date: endTimeObj.toISOString(),
    };

    const updatedAuction = await Auction.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.send({
      status: true,
      message: "Auction is updated successfully",
      data: updatedAuction,
    });
  } catch (err) {
    next(err);
  }
};

export default updateAuction;
