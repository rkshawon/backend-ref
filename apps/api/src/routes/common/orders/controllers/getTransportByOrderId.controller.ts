import { Request, Response, NextFunction } from "express";
import Transport from "../../../../models/transport.model";

const getTransportByOrderId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const loggedInUser: any = req.user;

    const transport = await Transport.findOne({
      order: req.params.orderId,
    }).populate("driver","-companies -password");

    res.send({
      status: true,
      transport,
    });

    console.log(loggedInUser);
  } catch (err) {
    next(err);
  }
};
export default getTransportByOrderId;
