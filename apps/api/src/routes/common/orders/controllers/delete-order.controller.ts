import { Request, Response, NextFunction } from "express";
import Order from "../../../../models/orders.model";
import Transport from "../../../../models/transport.model";

const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId)
    await Transport.findOneAndDelete({order:req.params.orderId})
    res.send({status: true, message: "Delete Order" });
  } catch (err) {
    next(err);
  }
};
export default deleteOrder
