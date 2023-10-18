import { NextFunction, Request, Response } from "express";
import DeliverySchedule from "../../../../models/deliverySchedule.modal";

const getUpcomingTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const currentDate = new Date();

    const upcomingTrips = await DeliverySchedule.find({
      driver: id,
      date: { $gt: currentDate },
    })
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
      .lean();

    const manipulate = upcomingTrips.map((data) => {
      const flattenedOrders = data.orders.map((order: any) => {
        return {
          ...order.order_id,
          order_id: order.order_id._id,
          delivery_status: order.delivery_status,
        };
      });

      data.orders = flattenedOrders;
      return data;
    });

    res.send({
      status: true,
      message: "Success",
      data: manipulate,
    });
  } catch (err) {
    next(err);
  }
};

export default getUpcomingTrips;
