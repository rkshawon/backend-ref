import CompanyServices from "../../../services/superadmin/companies"
import { Request, Response, NextFunction } from "express";

const updateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const body: any = req.body;
    const companyID: any = req.params.id;
    const company = await new CompanyServices().update(body, companyID);

    if (!company._id) {
      res.status(404).send({
        status: false,
        message: "No records found regarding this id",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "Company updated successfully",
        company,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default updateCompany;
