import { Request, Response, NextFunction } from "express";
import UserServices from "../../../services/superadmin/users";

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const body: any = req.body;
    const company = await new UserServices().addUser(body);
    if (!company._id) {
      res.status(403).send({
        status: true,
        message: "User already exist",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "Verification Email has been sent to user account",
        company,
      });
    }
  } catch (err: any) {
    next(err);
  }
};

export default createUser;
