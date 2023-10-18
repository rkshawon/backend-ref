import { NextFunction, Request, Response } from "express";
import Vehicle from "../../../../models/vehicles.model";

// eslint-disable-next-line import/no-anonymous-default-export
const deleteVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await Vehicle.findByIdAndDelete(id);

    res.send({
      status: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteVehicle;
