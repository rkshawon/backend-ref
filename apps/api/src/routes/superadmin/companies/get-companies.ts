import CompanyServices from "../../../services/superadmin/companies"
import { Request, Response, NextFunction } from "express";

const getAllCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // const loggedUser:any = req.user._id
    // console.log(loggedUser)
    let { page, size }: any = req.query;

    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size;

    const companies = await new CompanyServices().findAll(limit, skip);
    res.status(200).send({
      status: true,
      companies,
    });
  } catch (err) {
    next(err);
  }
};

export default getAllCompanies;
