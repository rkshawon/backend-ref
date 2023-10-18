import { NextFunction, Request, Response } from "express";
import Bid from "../../../../models/bid.model";

const getBidByCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company }: any = req.user;

    const bids = await Bid.find({ company: company.id }).populate({
      path: "auction",
      populate: [
        {
          path: "product",
          select: "title",
        },
      ],
    });

    res.send({
      status: true,
      data: bids,
    });
  } catch (err) {
    next(err);
  }
};

export default getBidByCompany;
