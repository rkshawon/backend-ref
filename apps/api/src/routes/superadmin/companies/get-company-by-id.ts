import CompanyServices from "../../../services/superadmin/companies"
import { Request, Response, NextFunction } from "express";

const getCompanyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const companyID: any = req.params.id;
    const company = await new CompanyServices().get(companyID);

    if (!company._id) {
      res.status(404).send({
        status: false,
        message: "No records found regarding this id",
      });
    } else {
      res.send(
        {status:true,
          company
        }
      );
    }
  } catch (err) {
    next(err);
  }
};

export default getCompanyById;
