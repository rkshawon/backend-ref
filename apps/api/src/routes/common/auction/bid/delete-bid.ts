import { NextFunction, Request, Response } from "express";
import Bid from "../../../../models/bid.model";

const deleteBid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    await Bid.findByIdAndDelete(id);

    res.send({
      status: true,
      message: "Bid is deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteBid;
