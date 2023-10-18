import { NextFunction, Request, Response } from "express";
import DeliverySchedule from "../../../../models/deliverySchedule.modal";

const deleteDeliverySchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await DeliverySchedule.findByIdAndDelete(id);

    res.send({
      status: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteDeliverySchedule;
