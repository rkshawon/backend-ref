import { NextFunction, Request, Response } from "express";
import Facilities from "../../../models/facilities.model";

const createFacilities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdFacilities = await Facilities.create(req.body);

    res.send({
      status: true,
      message: "Facility is created successfully",
      data: createdFacilities,
    });
  } catch (err) {
    next(err);
  }
};

export default createFacilities;
