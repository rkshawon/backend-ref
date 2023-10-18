import { NextFunction, Request, Response } from "express";
import Facilities from "../../../models/facilities.model";

const getFacilitiesById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await Facilities.findById(id);

    res.send({
      status: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default getFacilitiesById;
