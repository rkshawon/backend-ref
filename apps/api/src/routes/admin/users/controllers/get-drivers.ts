import { NextFunction, Request, Response } from "express";
import ICompanies from "../../../../interface/companies.interface";
import usersModel from "../../../../models/users.model";

const getDrivers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const loggedInUser: any = req.user;
    
    const loggedInUserCompanies = loggedInUser.companies.map(
      (company: { access: boolean; info: ICompanies }) => {
        if (company.access) {
          return company.info._id;
        }
      }
    );

    const users = await usersModel.find({
      "companies.info": loggedInUserCompanies,
      transport_id:{
        $exists: true
      },
      is_deleted:false
    });

    res.send({
      status: true,
      users,
    });
  } catch (err) {
    next(err);
  }
};

export default getDrivers;
