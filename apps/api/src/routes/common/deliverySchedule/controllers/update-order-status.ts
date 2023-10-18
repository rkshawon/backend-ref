import { NextFunction, Request, Response } from "express";
import DeliverySchedule from "../../../../models/deliverySchedule.modal";
import ApiError from "../../../../utils/http.error";
import mongoose from "mongoose";

const updateDeliveryOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.id;

    if (!mongoose.isValidObjectId(orderId)) {
      throw new ApiError(400, "OrderId is not valid");
    }

    const orderStatus = await DeliverySchedule.findOneAndUpdate(
      { "orders.order_id": orderId },
      {
        $set: {
          "orders.$.delivery_status": "marked_as_delivered",
        },
      },
      {
        new: true,
      }
    );

    if (!orderStatus) {
      throw new ApiError(404, "Order not found");
    }

    res.send({
      status: true,
      message: "Order Status updated successfully",
      data: orderStatus,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default updateDeliveryOrderStatus;
