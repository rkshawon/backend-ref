import CompanyServices from "../../../services/superadmin/companies"
import { Request, Response, NextFunction } from "express";

const getFilteredCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    let { page, size }: any = req.query;
    let filters: any = {};
    
    let filter: any = req.query.filter;

    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size;

    const queryRegx = new RegExp(filter, 'i');

    const companies = await new CompanyServices().filter(limit, skip, queryRegx);
    res.status(200).send({
      status: true,
      companies,
    });
  } catch (err) {
    next(err);
  }
};

export default getFilteredCompanies;
