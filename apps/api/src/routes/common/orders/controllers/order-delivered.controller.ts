import { Request, Response, NextFunction } from "express";
import Order from "../../../../models/orders.model";
import Notification from "../../../../models/notification.model";
import DeliverySchedule from "../../../../models/deliverySchedule.modal";

const OrderDelivered = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const loggedInUser: any = req.user;

    console.log(req.params.orderId);
    const order: any = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        status: "delivered",
        timeline: {
          title: `Order has been delivered`,
          postedBy: loggedInUser._id,
          createAt: Date.now,
        },
      },
      {
        new: true,
      }
    )
      .populate("product_list.product")
      .populate("buyer", "address business_name contact_email business_logo")
      .populate("seller", "address business_name contact_email business_logo");

    await DeliverySchedule.findOneAndUpdate(
      { "orders.order_id": req.params.orderId },
      {
        $set: {
          "orders.$.delivery_status": "delivered",
        },
      },
      {
        new: true,
      }
    );

    await Notification.create({
      sender: order.seller,
      receiver: order.buyer,
      text: `Your order <strong> #${order.order_number} </strong> has been delivered`,
      link: `/orders/myorders/${order._id}`,
    });

    res.send({ status: true, order });
  } catch (err) {
    next(err);
  }
};
export default OrderDelivered;
