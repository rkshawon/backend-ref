import { NextFunction, Request, Response } from "express";
import MetrcApiKey from "../../../../../models/metrc/metrcApikey.model";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company, _id: user_id }: any = req.user;
    const { api_key } = req.body;

    const existingMetrcApiKey = await MetrcApiKey.findOne({
      "company.id": company.id,
    });

    if (!existingMetrcApiKey) {
      return res.status(404).send({
        status: false,
        message: "Company ID does not exist",
      });
    }

    const data = await MetrcApiKey.findOneAndUpdate(
      { "company.id": company.id },
      { apiKey: api_key }
    );

    res.send({
      status: true,
      message: "Updated Successfully",
      data,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Could Not Update Item",
    });
    next(err);
  }
};
