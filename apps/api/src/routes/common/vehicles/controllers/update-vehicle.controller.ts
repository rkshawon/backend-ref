import { NextFunction, Request, Response } from "express";
import Vehicle from "../../../../models/vehicles.model";

const updateVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const updateData = req.body;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedVehicle) {
      return res.status(404).send({
        status: false,
        message: "Vehicle not found",
      });
    }

    res.send({
      status: true,
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    });
  } catch (err) {
    next(err);
  }
};

export default updateVehicle;
