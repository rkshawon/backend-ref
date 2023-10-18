import { NextFunction, Request, Response } from "express";
import MetrcApiKey from "../../../../../models/metrc/metrcApikey.model";
import getItemByAxios from "../../utils/getItemByAxios";
import { queryMetrcItems, searchMetrcItems } from "../../utils/queryMetrcItems";
import { Query } from "../../../../../interface/metrc.interface";

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
        message: "Invalid API Key or License Key",
      });
    }

    const licenseKey = data.licenseKey;

    const query: Query = req.query;
    let searchName = query.name || "";

    let filteredItems = await getItemByAxios(licenseKey);

    if (Object.keys(query).length !== 0) {
      filteredItems = queryMetrcItems(filteredItems, query);
    }

    if (searchName) {
      filteredItems = searchMetrcItems(filteredItems, searchName);
    }

    res.send({
      status: true,
      filteredItems,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Could Not Fetch Items",
    });
    next(err);
  }
};
