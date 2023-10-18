import { NextFunction, Request, Response } from "express";
import GPS from "../../../../models/gps.model";

const createGPS = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdGPS = await GPS.create(req.body);

    res.send({
      status: true,
      message: "GPS is created successfully",
      createdGPS,
    });
  } catch (error: any) {
    res.status(500).send({
      status: false,
      message: "Error Creating GPS",
      error: error.message,
    });
  }
};

export default createGPS;
