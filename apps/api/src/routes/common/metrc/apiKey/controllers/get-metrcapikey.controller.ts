import { NextFunction, Request, Response } from "express";
import MetrcApiKey from "../../../../../models/metrc/metrcApikey.model";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company, _id: user_id }: any = req.user;

    const data = await MetrcApiKey.findOne({
      "company.id": company.id,
    });

    if (!data) {
      return res.status(400).send({
        status: false,
        message: "API Key or License Key Not Found",
      });
    }

    res.send({
      status: true,
      data,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Could Not Fetch Item",
    });
    next(err);
  }
};
