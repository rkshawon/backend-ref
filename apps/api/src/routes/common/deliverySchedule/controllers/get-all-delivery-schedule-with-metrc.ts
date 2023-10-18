import { NextFunction, Request, Response } from "express";
import DeliverySchedule from "../../../../models/deliverySchedule.modal";
import ApiError from "../../../../utils/http.error";
import Order from "../../../../models/orders.model";
import mongoose from "mongoose";

const getAllDeliveryScheduleWithMetrc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { metrc } = req.query;

    let query: any = {};

    if (metrc) {
      query.metrc_status = metrc;
    } else {
      query.metrc_status = { $in: ["pending", "approved", "rejected"] };
    }
    const deliverySchedules = await DeliverySchedule.find(query)
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
      .lean();
    res.send({ data: deliverySchedules });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default getAllDeliveryScheduleWithMetrc;
