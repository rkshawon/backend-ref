import { NextFunction, Request, Response } from "express";
import Auction from "../../../../models/auction.model";

const deleteAuction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    await Auction.findByIdAndDelete(id);

    res.send({
      status: true,
      message: "Auction is deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteAuction;
