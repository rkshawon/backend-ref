import { NextFunction, Request, Response } from "express";
import GPS from "../../../../models/gps.model";

// eslint-disable-next-line import/no-anonymous-default-export
const deleteGPS = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    await GPS.findByIdAndDelete(id);

    res.send({
      status: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Could Not Delete The Item",
    });
    next(err);
  }
};

export default deleteGPS;
