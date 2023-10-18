import { Request, Response, NextFunction } from "express";
import Order from "../../../../models/orders.model";

const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    console.log("document");

    const order = await Order.findById(req.params.id)
      .populate("product_list.product")
      .populate(
        "buyer",
        "business_name license_type address contact_email contact_number business_logo"
      )
      .populate(
        "seller",
        "business_name license_type address contact_email contact_number business_logo"
      )
      .populate({
        path: "delivery_schedule",
        select: {
          orders: { $elemMatch: { order_id: req.params.id } },
          driver: 1,
          vehicle: 1,
          gps: 1,
          date: 1,
        },
        populate: [
          {
            path: "driver",
            select:
              "_id first_name last_name phone_number license_number profile_pic",
          },
          {
            path: "vehicle",
            select: "-createdAt -__v",
          },
          {
            path: "gps",
            select: "-createdAt -__v",
          },
        ],
      });
    res.send({ status: true, order });
  } catch (err) {
    next(err);
  }
};
export default getOrderById;
