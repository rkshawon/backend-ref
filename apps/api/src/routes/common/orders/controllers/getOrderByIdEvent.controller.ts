import { Request, Response, NextFunction } from "express";
import Order from "../../../../models/orders.model";

const getOrderByIdEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {

    const order = await Order.findById(req.params.id).populate("timeline.postedBy","first_name last_name")
    res.send({status: true, timeline:order?.timeline});
  } catch (err) {
    next(err);
  }
};
export default getOrderByIdEvent
