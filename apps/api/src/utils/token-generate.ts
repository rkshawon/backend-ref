import jwt from "jsonwebtoken";
import IAuthenticatedUser from "../interface/AuthenticatedUser.interfce";
import IUsers from "../interface/users.interface";

const superadminPermission = {
  dashboard: {
    access: true,
  },
  companies: {
    access: true,
  },
  facilities: {
    access: true,
  },
  settings: {
    access: true,
  },
};

interface ICompanylist {
  _id: String;
  business_name: string;
  license_type: string;
}

const LoginToken = async (user: IUsers): Promise<any> => {
  if (user.role === "superadmin") {
    // Access Token Generator
    const secret: any = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        user_id: user._id,
      },
      secret
    );

    const _user = {
      _id: user._id,
      role: user.role,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_pic: user.profile_pic,
      },
      permissions: superadminPermission,
      accessToken: token,
    };
    return _user;
  }

  console.log(user.companies[0].info);

  let _companies: Array<ICompanylist> = [];

  user.companies.map((company) => {
    if (company.access) {
      _companies.push({
        _id: company.info._id,
        business_name: company.info.business_name,
        license_type: company.info.license_type,
      });
    }
  });

  const defaultCompany = user.companies.filter((company) => {
    return company.access === true;
  });

  // Access Token Generator
  const secret: any = process.env.JWT_SECRET;

  const token = jwt.sign(
    {
      user_id: user._id,
      company_id: defaultCompany[0].info._id,
    },
    secret
  );

  const _user: IAuthenticatedUser = {
    _id: user._id,
    role: user.role,
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      profile_pic: user.profile_pic,
    },
    company_list: _companies,
    company: defaultCompany[0]?.info || null,
    permissions: defaultCompany[0]?.permissions || null,
    accessToken: token,
  };
  return _user;
};

export default LoginToken;
