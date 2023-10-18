import { Request, Response, NextFunction } from "express";
import IUsers from "../../../interface/users.interface";
import usersModel from "../../../models/users.model";
import CompanyServices from "../../../services/users/companies/companies.services";
import ApiError from "../../../utils/http.error";


const getUserCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const _user_data=await usersModel.findById(req.user).populate("companies.info")
    if(!_user_data){
      throw new ApiError(400,"User not found")
    }
    
    const user = new CompanyServices().userCompany(_user_data,req.params.company_id);
    res.send(user);

  } catch (err) {
    next(err);
  }
};

export default getUserCompany;
