import { NextFunction, Request, Response } from "express";
import Transport from "../../../../models/transport.model";
import Order from "../../../../models/orders.model";

const outForDelivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Order.updateMany(
      { _id: { $in: req.body } },
      {
        status: "out_for_delivery",
      }
    );

    const transports = await Transport.updateMany(
      { order: { $in: req.body } },
      {
        status: "out_for_delivery",
      }
    );


    return res.send({
      status: true,
      transports,
    });
  } catch (error) {
    console.log("single room fetch error: ", error);
    next(error);
  }
};

export default outForDelivery;
