import { NextFunction, Request, Response } from "express";
import companiesModel from "../../../models/companies.model";

const updateCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {

    console.log("called")
    const { company, _id: user_id }: any = req.user;


    const keys = Object.keys(req.body).join(" ");

    const _company = await companiesModel
      .findByIdAndUpdate(company.id, req.body, { new: true })
      .select(keys);

    res.status(200).send(_company);
  } catch (error) {
    next(error);
  }
};

export default updateCompany;
