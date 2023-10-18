import { NextFunction, Request, Response } from "express";
import DeliverySchedule from "../../../../models/deliverySchedule.modal";
import ApiError from "../../../../utils/http.error";
import mongoose from "mongoose";
import Order from "../../../../models/orders.model";

const updateDeliverySchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deliveryScheduleId = req.params.id;
    const { order: orderID }: any = req.query;

    // const isValidOrder = req.body.orders.some(
    //   (order: any) => order?.order_id?.toString() === orderID?.toString()
    // );

    // if (!isValidOrder) {
    //   throw new ApiError(400, "Order id is not valid");
    // }

    if (!mongoose.isValidObjectId(deliveryScheduleId)) {
      throw new ApiError(400, "deliveryScheduleId is not valid");
    }

    const reqOrderIds = req?.body?.orders?.map(
      (item: any) => new mongoose.Types.ObjectId(item.order_id)
    );

    await DeliverySchedule.updateMany(
      {
        "orders.order_id": { $in: reqOrderIds },
      },
      {
        $pull: {
          orders: { order_id: { $in: reqOrderIds } },
        },
      }
    );

    const deliverySchedule = await DeliverySchedule.findByIdAndUpdate(
      deliveryScheduleId,
      {
        $set: {
          orders: req.body.orders,
          driver: req.body.driver,
          vehicle: req.body.vehicle,
          gps: req.body.gps,
          metrc_status: req.body.metrc_status,
          isTripStarted: req.body.isTripStarted,
          isScheduled: req.body.isScheduled,
        },
      },
      {
        new: true,
      }
    );

    if (req.body.isScheduled) {
      const status = "delivery_schedule";
      await Order.updateMany(
        { delivery_schedule: deliveryScheduleId },
        { status },
        { upsert: true }
      );
    }
    if (req.body.isTripStarted) {
      const status = "out_for_delivery";
      await Order.updateMany(
        { delivery_schedule: deliveryScheduleId },
        { status },
        { upsert: true }
      );
    }
    if (
      orderID &&
      !deliverySchedule?.isScheduled &&
      !deliverySchedule?.isTripStarted
    ) {
      await Order.findByIdAndUpdate(
        orderID,
        { delivery_schedule: deliverySchedule, status: "transport_organize" },
        { upsert: true }
      );
    }

    // await upsertTransport(
    //   deliverySchedule,
    //   orderID,
    //   loggedInUser,
    //   req.body.date
    // );

    res.send({
      status: true,
      message: "Delivery Schedule updated successfully",
      data: deliverySchedule,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default updateDeliverySchedule;
