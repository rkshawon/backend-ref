import { NextFunction, Request, Response } from "express";
import GPS from "../../../../models/gps.model";

const createGPS = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company }: any = req.user;
    const data = { ...req.body, company };
    const createdGPS = await GPS.create(data);

    res.send({
      status: true,
      message: "GPS is created successfully",
      createdGPS,
    });
  } catch (err) {
    next(err);
  }
};

export default createGPS;
