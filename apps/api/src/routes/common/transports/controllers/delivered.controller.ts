import { NextFunction, Request, Response } from "express";
import Transport from "../../../../models/transport.model";
import Order from "../../../../models/orders.model";
import Notification from "../../../../models/notification.model";

const OrderDeliveredByTransporter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loggedInUser: any = req.user;

    const order:any = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $push: {
          timeline: {
            title: "Driver marks the order as delivered" ,
            postedBy: loggedInUser._id,
            createAt: Date.now,
          },
        },
      },
      {
        new: true,
      }
    )

    
    const transport = await Transport.findOneAndUpdate(
      { order: req.params.orderId },
      {
        status: "delivered",
      },
      {
        new: true,
      }
    );

    await Notification.create({
      sender:order.seller,
      receiver:order.buyer,
      text:`Your order <strong> #${order.order_number} </strong> has been marked as delivered by the driver. Please confirm that you have received it.`,
      link: `/orders/myorders/${order._id}`
    })




    return res.send({
      status: true,
      transport,
    });
  } catch (error) {
    console.log("single room fetch error: ", error);
    next(error);
  }
};

export default OrderDeliveredByTransporter;
