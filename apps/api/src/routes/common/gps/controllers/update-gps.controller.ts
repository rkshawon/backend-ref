import { NextFunction, Request, Response } from "express";
import GPS from "../../../../models/gps.model";

const updateGPS = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const updateData = req.body;

    const updatedGPS = await GPS.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedGPS) {
      return res.status(404).send({
        status: false,
        message: "GPS not found",
      });
    }

    res.send({
      status: true,
      message: "GPS updated successfully",
      data: updatedGPS,
    });
  } catch (err) {
    next(err);
  }
};

export default updateGPS;
