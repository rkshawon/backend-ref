import { NextFunction, Request, Response } from "express";
import Facilities from "../../../models/facilities.model";

const updateFacilities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Facilities.findByIdAndDelete(id);

    res.send({
      status: true,
      message: "Facility is deleted",
    });
  } catch (err) {
    next(err);
  }
};

export default updateFacilities;
