import { NextFunction, Request, Response } from "express";
import Auction from "../../../../models/auction.model";

const createAuction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company }: any = req.user;

    const { start_date, duration } = req.body;

    const startTimeObj = new Date(start_date);

    const endTimeObj = new Date(startTimeObj.getTime() + duration * 60000);

    const data = {
      ...req.body,
      company: company.id,
      end_date: endTimeObj.toISOString(),
    };

    const createdAuction = await Auction.create(data);

    res.send({
      status: true,
      message: "Auction is created successfully",
      data: createdAuction,
    });
  } catch (err) {
    next(err);
  }
};

export default createAuction;
