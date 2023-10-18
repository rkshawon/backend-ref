import { compareSync } from "bcrypt";
import DeliverySchedule from "../../../../models/deliverySchedule.modal";

export const flattenData = (data: any) => {
  const flattenedOrders = data.orders.map((order: any) => {
    return {
      ...order.order_id,
      order_id: order.order_id._id,
      delivery_status: order.delivery_status,
    };
  });

  data.orders = flattenedOrders;
  return data;
};

export const conflictObject = (conflictItem: any, orderId: any) => {
  const singleOrder = conflictItem.orders.find((i: any) => {
    return i.order_id.equals(orderId);
  });
  const conflict = {
    status: true,
    order: {
      order_id: orderId,
      order_number: singleOrder.order_number || "",
      driver: conflictItem.driver || {},
      delivery_date:
        new Date(conflictItem.date).toISOString().split("T")[0] || "",
      buyer: singleOrder.buyer || {},
      planned_routes: singleOrder.planned_routes || {},
    },
  };
  return conflict;
};

export const findConflictAndDelete = (conflictCheack: any, order: any) => {
  const orderExists = conflictCheack.find((schedule: any) =>
    schedule.orders.some((conflictOrder: any) =>
      conflictOrder.order_id._id.equals(order)
    )
  );

  if (orderExists) {
    orderExists.orders = orderExists.orders.filter(
      (conflictOrder: any) => !conflictOrder.order_id._id.equals(order)
    );
  }
  return orderExists;
};

export const populateData = async (id: any) => {
  return await DeliverySchedule.findById(id)
    .populate({
      path: "company",
      select: "_id business_name license_type business_logo address",
    })
    .populate({
      path: "gps",
    })
    .populate({
      path: "vehicle",
    })
    .populate({
      path: "driver",
      select:
        "_id first_name last_name phone_number license_number profile_pic",
    })
    .populate({
      path: "orders.order_id",
      populate: [
        {
          path: "buyer",
          select:
            "first_name last_name business_logo address business_name _id",
        },
      ],
      select:
        "-timeline -product_list -createdAt -updatedAt -status -__v -seller -users -transport",
    })
    .exec();
};
