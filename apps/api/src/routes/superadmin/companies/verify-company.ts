import CompanyServices from "../../../services/superadmin/companies";
import { Request, Response, NextFunction } from "express";

const verifyCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | any> => {
  try {
    const status: string = req.query.status as string;

    const message = await new CompanyServices().verify(
      req.params.company_id,
      status
    );
    res.send({
      status: true,
      message,
    });
  } catch (err) {
    next(err);
  }
};

export default verifyCompany;
