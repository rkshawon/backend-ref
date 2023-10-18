import { Request, Response, NextFunction } from "express";
import Order from "../../../../models/orders.model";
import Transport from "../../../../models/transport.model";
import ApiError from "../../../../utils/http.error";
import Notification from "../../../../models/notification.model";

const createTransport = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const loggedInUser: any = req.user;

    const order: any = await Order.findById(req.params.orderId)
      .populate(
        "buyer",
        "business_name license_type address contact_email contact_number coordinates"
      )
      .populate(
        "seller",
        "business_name license_type address contact_email contact_number coordinates"
      );

    if (!order) {
      throw new ApiError(400, "Order not found");
    }

    const transport: any = await Transport.findOneAndUpdate(
      {
        order: order._id,
      },
      {
        order: order._id,
        driver: req.body.driver,
        delivery_date: new Date(req.body.delivery_date),
        origin: {
          state: order.seller.address.state,
          street: order.seller.address.street,
          coordinates: order.seller.address.coordinates,
        },
        destination: {
          state: order.buyer.address.state,
          street: order.buyer.address.street,
          coordinates: order.buyer.address.coordinates,
        },
        company: loggedInUser.company.id,
      },
      {
        upsert: true,
        new: true,
      }
    );

    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        $set: {
          transport: transport._id,
          status: "transport_organize",
        },
      },
      {
        new: true,
      }
    );

    await Notification.create({
      sender: order.seller,
      receiver: order.buyer,
      text: `A transport has been organized to deliver your order <strong> #${order.order_number} </strong>.`,
      link: `/orders/myorders/${order._id}`,
    });

    res.send({
      status: true,
      transport: transport,
      order: updatedOrder,
    });
  } catch (err) {
    next(err);
  }
};
export default createTransport;
