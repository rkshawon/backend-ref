import { NextFunction, Request, Response } from "express";
import Vehicle from "../../../../models/vehicles.model";

// eslint-disable-next-line import/no-anonymous-default-export
const getVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company }: any = req.user;

    const data = await Vehicle.find({
      "company.id": company.id,
    });

    if (data.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No vehicles found for the company",
      });
    }

    res.send({
      status: true,
      message: "Vehicles fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default getVehicle;
