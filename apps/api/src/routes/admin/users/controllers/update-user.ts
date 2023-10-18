import { Request, Response, NextFunction } from "express";
import usersModel from "../../../../models/users.model";
import { adminPermission, memberPermission,driverPermission } from "../../../../utils/permissions";
import IUsers from "../../../../interface/users.interface";
import ICompanies from "../../../../interface/companies.interface";
import ApiError from "../../../../utils/http.error";






const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {

    let user: IUsers = req.body
    const loggiedUser: any = req.user;


    if(user.companies){
      let validCompany = user.companies.filter(company => {
        const isCompanyValid = loggiedUser.companies.some((admin_company: { access: boolean, info: ICompanies; }) => {
          if (admin_company.access) {
            return company.info === admin_company.info._id.toString();
          }
        });
  
        if (isCompanyValid) {
          return company;
        }
      });
  
      if (validCompany.length === 0) {
        throw new ApiError(400, "You don't have any valid company")
      }
  
      if (user.role === "admin") {
        user.companies.forEach(company => {
          company.permissions = adminPermission
        })
      } else if(user.role === "driver"){
        user.companies.forEach(company => {
          company.permissions = driverPermission
        })
      }else if(user.role === "member"){ 
        user.companies.forEach(company => {
          company.permissions = memberPermission
        })
      }else{
        throw new ApiError(400, "Role not found")
      }
  
      user.companies = validCompany;

    }

   
    // console.log(user.companies)

    const keys = Object.keys(req.body).join(" ");

    const _user = await usersModel.findByIdAndUpdate(req.params.user_id,user,{new:true}).select(keys)

    res.send({
      status: true,
      user:_user
    })
  } catch (err) {
    next(err);
  }
};

export default updateUser;
