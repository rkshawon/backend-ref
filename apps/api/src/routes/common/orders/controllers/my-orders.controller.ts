import { Request, Response, NextFunction } from "express";
import Order from "../../../../models/orders.model";

const getMyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const loggedInUser: any = req.user;

    const orders = await Order.find({
      buyer: loggedInUser.company.id,
    })
      .populate("product_list.product")
      .populate("buyer", "business_name license_type address contact_email contact_number")
      .populate("seller", "business_name license_type address contact_email contact_number")
      .sort({ createdAt: -1 })
      .lean();

    res.send({ status: true, orders });
  } catch (err) {
    next(err);
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default getMyOrders;
