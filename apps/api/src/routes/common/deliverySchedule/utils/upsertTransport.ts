import notification from "../../../../models/notification.model";
import Order from "../../../../models/orders.model";
import Transport from "../../../../models/transport.model";

const createTransport = async (
  deliverySchedule: any,
  orderId: any,
  loggedInUser: any,
  date: any
) => {
  const order: any = await Order.findById(orderId)
    .populate(
      "buyer",
      "business_name license_type address contact_email contact_number coordinates"
    )
    .populate(
      "seller",
      "business_name license_type address contact_email contact_number coordinates"
    );

  if (!order) {
    return "Order not found";
  }
  const transport: any = await Transport.findOneAndUpdate(
    {
      order: order._id,
    },
    {
      order: order._id,
      driver: deliverySchedule.driver,
      delivery_date: new Date(date),
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
  await Order.findByIdAndUpdate(
    order._id,
    {
      $set: {
        transport: transport._id,
        status: "delivery_schedule",
      },
    },
    {
      new: true,
    }
  );

  await notification.create({
    sender: order.seller,
    receiver: order.buyer,
    text: `A delivery schedule has been created your order <strong> #${order.order_number} </strong>.`,
    link: `/orders/myorders/${order._id}`,
  });
};

export default createTransport;
