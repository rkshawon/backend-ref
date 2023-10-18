import { NextFunction, Request, Response } from "express";
import ICompanies from "../../../../interface/companies.interface";
import usersModel from "../../../../models/users.model";
import ApiError from "../../../../utils/http.error";

const deleteUser = async (
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
    
    const user =  await usersModel.findOneAndDelete({
        _id:req.params.user_id,
        "companies.info": loggedInUserCompanies,
        is_deleted:false
    },{
        is_deleted:true
    });

    if(!user){
        throw new ApiError(400,"User Not found")
    }

    res.send({
      status: true,
      message:"successfully user deleted ",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
