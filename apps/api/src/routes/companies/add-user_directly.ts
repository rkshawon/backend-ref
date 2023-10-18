import { Request, Response, NextFunction } from "express";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../../services/mail";
import ApiError from "../../utils/http.error";
import ICompanies from "../../interface/companies.interface";
import IUsers from "../../interface/users.interface";
import {
  adminPermission,
  driverPermission,
  memberPermission,
} from "../../utils/permissions";
import usersModel from "../../models/users.model";
import LoginToken from "../../utils/token-generate";

const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
  userBody: any,
  company: any
): Promise<Response | void> => {
  try {
    const { first_name, last_name, contact_email, password } = userBody;

    const user: any = {
      first_name,
      last_name,
      email: contact_email,
      password,
    };

    // Check if email already exists
    const existingUser = await usersModel.findOne({ email: user.email });
    if (existingUser) {
      throw new ApiError(400, "User already registered.");
    }

    user.companies = [
      { info: company, access: true, permissions: adminPermission },
    ];

    const _user = await usersModel.create(user);

    const data = await LoginToken(_user);

    res.send({
      status: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default addUser;
