import { Request, Response, NextFunction } from "express";
import Order from "../../../../models/orders.model";
import Notification from "../../../../models/notification.model";

const OrderTransport = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const loggedInUser: any = req.user;

    const order: any = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        status: "transport_organize",
        $push: {
          timeline: {
            title: "Your order has been transported",
            postedBy: loggedInUser._id,
            createAt: Date.now,
          },
        },
      },
      {
        new: true,
      }
    )
      .populate("product_list.product")
      .populate("buyer", "address business_name contact_email business_logo")
      .populate("seller", "address business_name contact_email business_logo");

    await Notification.create({
      sender: order.seller,
      receiver: order.buyer,
      text: `Your order <strong> #${order.order_number} </strong> has been transported and is being processed.`,
      link: `/orders/myorders/${order._id}`,
    });

    res.send({ status: true, order });
  } catch (err) {
    next(err);
  }
};
export default OrderTransport;
