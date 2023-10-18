import { Request, Response, NextFunction } from "express";
import usersModel from "../../../../models/users.model";
import bcrypt, { compareSync } from "bcrypt";
import {
  adminPermission,
  memberPermission,
  driverPermission,
} from "../../../../utils/permissions";
import IUsers from "../../../../interface/users.interface";
import ICompanies from "../../../../interface/companies.interface";
import ApiError from "../../../../utils/http.error";
import jwt from "jsonwebtoken";
import sendEmail from "../../../../services/mail";

const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    let user: IUsers = req.body;
    const loggedInUser: any = req.user;

    // Check if email already exists
    const existingUser = await usersModel.findOne({ email: user.email });
    if (existingUser) {
      throw new ApiError(400, "User already registered.");
    }

    // console.log(isCompanyValid)
    let validCompany = user.companies.filter((company) => {
      const isCompanyValid = loggedInUser.companies.some(
        (admin_company: { access: boolean; info: ICompanies }) => {
          if (admin_company.access) {
            return company.info === admin_company.info._id.toString();
          }
        }
      );

      if (isCompanyValid) {
        return company;
      }
    });

    if (validCompany.length === 0) {
      throw new ApiError(400, "You don't have any valid company");
    }

    if (user.role === "admin") {
      user.companies.forEach((company) => {
        company.access = true;
        company.permissions = adminPermission;
      });
    } else if (user.role === "member") {
      user.companies.forEach((company) => {
        company.access = true;
        company.permissions = memberPermission;
      });
    } else if (user.role === "driver") {
      user.companies.forEach((company) => {
        company.access = true;
        company.permissions = driverPermission;
      });

      // Add driver object only for role "driver"
      user.driver = {
        driver_name: req.body.driver.driver_name,
        license_number: req.body.driver.license_number,
        phone_number: req.body.driver.phone_number,
        occupational_license_number:
          req.body.driver.occupational_license_number,
      };
    } else {
      throw new ApiError(400, "Role not found");
    }

    user.companies = validCompany;
    user.password = "123";

    const _user = await usersModel.create(req.body);

    const secret: any = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        id: _user._id,
      },
      secret
    );

    sendEmail(
      [_user.email],
      {
        subject: `Congratulations! Your account has been created..`,
        data: {
          first_name: _user.first_name,
          last_name: _user.last_name,
          token: process.env.CLIENT_PORT + "/set-password/" + token,
        },
      },
      "account_created"
    );

    res.send({
      status: true,
      user: _user,
    });
  } catch (err) {
    next(err);
  }
};

export default addUser;
