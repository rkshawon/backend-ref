import { NextFunction, Request, Response } from "express";
import GPS from "../../../../models/gps.model";

// eslint-disable-next-line import/no-anonymous-default-export
const getGPS = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await GPS.find();

    if (data.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No data found for the company",
      });
    }

    res.send({
      status: true,
      message: "data fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default getGPS;
