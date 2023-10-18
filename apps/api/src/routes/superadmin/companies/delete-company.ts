import CompanyServices from "../../../services/superadmin/companies"
import { Request, Response, NextFunction } from "express";

const deleteCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const companyID: any = req.params.id;
    const company = await new CompanyServices().delete(companyID);
    if (!company._id) {
      res.status(404).send({
        status: false,
        message: "No records found regarding this id",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "Company deleted successfully"
      });
    }
  } catch (err) {
    next(err);
  }
};

export default deleteCompany;
