import jwt from "jsonwebtoken";
import IAuthenticatedUser from "../../../interface/AuthenticatedUser.interfce";
import IUsers from "../../../interface/users.interface";
import ApiError from "../../../utils/http.error";

interface ICompanylist{
  _id:String;
  business_name:string;
  license_type:string;
  business_logo:string
}
interface INotFoundCompany{
  _id:string,
  role: string,
  user: {
    first_name: string,
    last_name: string,
    email: string,
    profile_pic: string,
  },
  company_list?: Array<any>,
  company: null,
  permissions: null,
  accessToken:string
}

const userCompany = (user: IUsers, company_id: string): any => {

  if (!user.companies || user.companies.length == 0) {
    throw new ApiError(400, "No company existes")
  };
  const companies = user.companies;


  let _companies:Array<ICompanylist>=[];

  user.companies.map(company => {
    if (company.access) {
      _companies.push({
        "_id": company.info._id,
        "business_name": company.info.business_name,
        "license_type": company.info.license_type,
        "business_logo": company.info.business_logo,

      })
    }
  });

  const company = companies.find(company => {
    if (company.access === true) {
      return company.info._id.toString() === company_id;
    }
  });



    // Access Token Generator
    const secret: any = process.env.JWT_SECRET;

    const token = jwt.sign(
      {
        user_id: user._id,
        company_id: company?.info._id
      },
      secret
    );

    

  if (!company) {
    const user_data: INotFoundCompany = {
      _id: user._id,
      role: user.role,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_pic: user.profile_pic,
      },
      company_list: _companies,
      company: null,
      permissions: null,
      accessToken:token


    }
    return user_data
    
  }





  const user_data: IAuthenticatedUser = {
    _id: user._id,
    role: user.role,
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      profile_pic: user.profile_pic,
    },
    company_list: _companies,
    company: company.info,
    permissions: company.permissions,
    accessToken:token
  }
  return user_data
}


export default userCompany;