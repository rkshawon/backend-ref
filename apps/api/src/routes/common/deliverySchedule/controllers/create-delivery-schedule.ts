import { NextFunction, Request, Response } from "express";
import DeliverySchedule from "../../../../models/deliverySchedule.modal";

const createDeliverySchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company }: any = req.user;

    const data = { ...req.body, company: company.id };
    const createdDeliverySchedule = await DeliverySchedule.create(data);

    res.send({
      status: true,
      message: "Delivery Schedule is created successfully",
      data: createdDeliverySchedule,
    });
  } catch (err) {
    next(err);
  }
};

export default createDeliverySchedule;
