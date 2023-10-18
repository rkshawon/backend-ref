import { NextFunction, Request, Response } from "express";
import Facilities from "../../../models/facilities.model";

const updateFacilities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await Facilities.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.send({
      status: true,
      message: "Facility is updated",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default updateFacilities;
