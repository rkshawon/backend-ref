import CompanyServices from "../../../services/superadmin/companies"
import { Request, Response, NextFunction } from "express";

const searchCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    let { page, size }: any = req.query;
    let searchTerm: any = req.query.text;

    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size;

    const queryRegx: any = new RegExp(searchTerm, "i");

    const companies = await new CompanyServices().searchCompany(
      limit,
      skip,
      queryRegx
    );
    res.status(200).send({
      status: true,
      companies,
    });
  } catch (err) {
    next(err);
  }
};

export default searchCompanies;
