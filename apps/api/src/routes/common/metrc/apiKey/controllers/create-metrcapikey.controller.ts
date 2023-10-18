import { NextFunction, Request, Response } from "express";
import MetrcApiKey from "../../../../../models/metrc/metrcApikey.model";
import getItemByAxios from "../../utils/getItemByAxios";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company, _id: user_id }: any = req.user;
    const { api_key, license_key } = req.body;

    if (!api_key || !license_key) {
      return res.status(400).send({
        success: false,
        message: "An API key or License Key must be provided",
      });
    }

    await getItemByAxios(license_key);

    const existingApiKey = await MetrcApiKey.findOne({
      $or: [
        { apiKey: api_key },
        { "company.id": company.id },
        { user: user_id },
      ],
    });

    if (existingApiKey) {
      return res.status(400).send({
        status: false,
        message: "Company ID, user ID, or API key already exist",
      });
    }

    const metrc = await MetrcApiKey.create({
      company: company,
      user: user_id,
      apiKey: api_key,
      licenseKey: license_key,
    });

    res.send({
      status: true,
      message: "MetrcApiKey created successfully",
      metrc,
    });
  } catch (error: any) {
    if (error.status === 400) {
      res.status(400).send({
        status: false,
        message: "Invalid License Key",
      });
    } else {
      res.status(500).send({
        status: false,
        message: "Error Creating MetrcApiKey",
      });
    }
  }
};
