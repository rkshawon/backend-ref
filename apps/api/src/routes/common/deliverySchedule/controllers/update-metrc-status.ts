import { NextFunction, Request, Response } from "express";
import DeliverySchedule from "../../../../models/deliverySchedule.modal";
import ApiError from "../../../../utils/http.error";
import mongoose from "mongoose";

const updateMetrcStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const scheduleId = req.params.id;
    const { status } = req.query;

    if (!mongoose.isValidObjectId(scheduleId)) {
      throw new ApiError(400, "OrderId is not valid");
    }
    if (!status) {
      throw new ApiError(400, "Invalid Metrc Status Query");
    }

    const orderStatus = await DeliverySchedule.findOneAndUpdate(
      { _id: scheduleId },
      {
        $set: {
          metrc_status: status,
        },
      },
      {
        new: true,
      }
    );

    if (!orderStatus) {
      throw new ApiError(404, "Schedule not found");
    }

    res.send({
      status: true,
      message: "Metrc Status updated successfully",
      data: orderStatus,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default updateMetrcStatus;
