import { NextFunction, Request, Response } from "express";
import MetrcApiKey from "../../../../../models/metrc/metrcApikey.model";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company, _id: user_id }: any = req.user;

    await MetrcApiKey.findOneAndDelete(company.id);

    res.send({
      status: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Could Not Delete Item",
    });
    next(err);
  }
};
