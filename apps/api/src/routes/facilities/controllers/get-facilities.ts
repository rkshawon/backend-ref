import { NextFunction, Request, Response } from "express";
import Facilities from "../../../models/facilities.model";

const getFacilities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      query,
      limit = 100,
      page = 1,
      sortBy,
      sortOrder,
    } = req.query as {
      query?: string;
      limit?: string;
      page?: string;
      sortBy?: string;
      sortOrder?: string;
    };

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const skip = (pageNumber - 1) * limitNumber;

    let queryString = {};
    let meta = {};

    if (query) {
      const regexPattern = new RegExp(query.toString(), "i");

      queryString = {
        $or: [
          { business_name: { $regex: regexPattern } },
          { license_number: { $regex: regexPattern } },
        ],
      };
    }

    const totalCount = await Facilities.countDocuments(queryString);

    meta = {
      page,
      limit,
      total: totalCount,
    };

    const sortOptions: any = {};
    if (sortBy && sortOrder) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const data = await Facilities.find(queryString)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    const responseObj = {
      status: true,
      message: "success",
      data,
      meta,
    };

    res.send(responseObj);
  } catch (err) {
    next(err);
  }
};

export default getFacilities;
