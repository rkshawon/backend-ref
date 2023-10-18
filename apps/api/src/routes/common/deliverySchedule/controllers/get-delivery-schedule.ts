import { NextFunction, Request, Response } from "express";
import DeliverySchedule from "../../../../models/deliverySchedule.modal";
import ApiError from "../../../../utils/http.error";
import Order from "../../../../models/orders.model";
import mongoose from "mongoose";

const getDeliverySchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { driver, date, order } = req.query;
    const { company }: any = req.user;

    if (!mongoose.isValidObjectId(driver) || !date) {
      throw new ApiError(400, "DriverID and Date must need to provide");
    }

    const deliveryData = await DeliverySchedule.findOneAndUpdate(
      {
        driver: driver,
        date: { $eq: date },
        company: company.id,
      },
      {
        driver: driver,
        date: date,
        company: company.id,
      },
      {
        upsert: true,
        new: true,
      }
    )
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

    const data = flattenData(deliveryData);

    if (order) {
      const reqOrder: any = await Order.findById(order)
        .populate(
          "buyer",
          "first_name last_name business_logo address business_name _id"
        )
        .select(
          "-timeline -product_list -createdAt -updatedAt -status -__v -seller -users -transport"
        )
        .lean();

      const reqOrderSchedule: any = await DeliverySchedule.findOne({
        "orders.order_id": order,
      })
        .populate({
          path: "driver",
          select:
            "_id first_name last_name phone_number license_number profile_pic",
        })
        .lean();

      console.log(reqOrderSchedule);

      if (reqOrderSchedule) {
        reqOrder.status = "reassign";
        reqOrder.order_id = reqOrder._id;
        reqOrder.assigned_info = {
          driver: reqOrderSchedule.driver,
          date: reqOrderSchedule.date,
        };
        const exists = data.orders.find(
          (order: any) =>
            order?.order_id.toString() === reqOrder.order_id.toString()
        );
        // if(exists){
        //   exists.status = "reassign";
        //   exists.assigned_info = reqOrder.assigned_info;
        // } else{
        //   data.orders.push(reqOrder);
        // }
        if (!exists) {
          data.orders.push(reqOrder);
        }
      } else {
        reqOrder.status = "assign";
        reqOrder.order_id = reqOrder._id;

        data.orders.push(reqOrder);
      }
    }

    res.send({ data });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const flattenData = (data: any) => {
  const manipulatedOrders = data.orders.map((order: any) => {
    let manipulatedOrder = { ...order.order_id, ...order };
    manipulatedOrder.order_id = order.order_id._id;
    manipulatedOrder.status = "assigned";
    delete manipulatedOrder.planned_routes;
    return manipulatedOrder;
  });
  data.orders = manipulatedOrders;
  if (!data?.vehicle && !data?.gps) {
    data.manifest_step = 0;
  } else if (!data?.isScheduled && !data?.vehicle) {
    data.manifest_step = 1;
  } else if (!data?.isScheduled && data?.vehicle) {
    data.manifest_step = 2;
  } else if (data?.isScheduled && !data?.metrc_status) {
    data.manifest_step = 2;
  } else if (data?.isScheduled && data?.metrc_status) {
    data.manifest_step = 3;
  }
  return data;
};

export default getDeliverySchedule;
