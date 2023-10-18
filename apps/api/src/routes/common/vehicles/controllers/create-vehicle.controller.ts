import { NextFunction, Request, Response } from "express";
import Vehicle from "../../../../models/vehicles.model";

const createVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company }: any = req.user;

    const data = { ...req.body, company };

    const vehicle = await Vehicle.create(data);

    res.send({
      status: true,
      message: "Vahicle is created successfully",
      data: vehicle,
    });
  } catch (err) {
    next(err);
  }
};

export default createVehicle;
