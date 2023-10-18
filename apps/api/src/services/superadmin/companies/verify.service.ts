import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import ICompanies from "../../../interface/companies.interface";
import companiesModel from "../../../models/companies.model";
import userModel from "../../../models/users.model";

import ApiError from "../../../utils/http.error";
import { adminPermission } from "../../../utils/permissions";
import sendEmail from "../../mail";

const verifyCompanyService = async (
  company_id: string,
  status: string
): Promise<any> => {
  await companiesModel.findByIdAndUpdate(
    company_id,
    { status },
    {
      new: true,
    }
  );

  // Find Company Details
  const company = await companiesModel.findById(company_id);

  if (!company) {
    throw new ApiError(401, "Company doesn't exists");
  }

  if (company.isVerified) {
    return "Your company is already Verifeid";
  }

  // Checking any user exists using the company email;
  const user = await userModel.findOne({ email: company?.contact_email });

  if (user) {
    // If there is an existing user, We will append the company_id inside user's companies attribute'
    // const isCompanyExist = user.companies.some((user_company) =>
    //   user_company.info.equals(company._id)
    // );
    // if (isCompanyExist) {
    //   throw new ApiError(400, "Company is already assoicate with this user");
    // }
    // Compnay_id added inside user
    await companiesModel.findByIdAndUpdate(company._id, { isVerified: true });
    await userModel.findByIdAndUpdate(user._id, {
      $push: {
        companies: {
          info: company._id,
          access: true,
          permissions: adminPermission,
        },
      },
    });

    sendEmail(
      [company.contact_email],
      {
        subject: "New Account Added",
        data: company.toObject(),
      },
      "company_onboard_in_exisitng_email"
    );

    return "New comapny has been added succesuflly";
  } else {
    // We verified company email, Now user can create new account with their email;
    await companiesModel.findByIdAndUpdate(company._id, { isVerified: true });
    // We will create the user account & send a email to set password to them;
    const user = await userModel.create({
      first_name: company.first_name,
      last_name: company.last_name,
      email: company.contact_email,
      password: Math.random(),
      role: "admin",
      companies: {
        info: company._id,
        access: true,
        permissions: adminPermission,
      },
    });

    const secret: any = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    console.log(token);
    sendEmail(
      [company.contact_email],
      {
        subject: `Congratulations! Your ${company.license_type} account has been created..`,
        data: {
          first_name: company.first_name,
          last_name: company.last_name,
          token: process.env.CLIENT_PORT + "/set-password/" + token,
        },
      },
      "approved_company"
    );

    return "Your account has been created, Now you can set your password";
  }
};

export default verifyCompanyService;
