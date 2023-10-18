import CompanyServices from "../../../services/superadmin/companies";
import { Request, Response, NextFunction } from "express";

const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const company = await new CompanyServices().create(req.body);
    res
      .status(200)
      .send({
        status: true,
        company,
        message: "Company registration successfully done",
      });
  } catch (err) {
    next(err);
  }
};

export default createCompany;
