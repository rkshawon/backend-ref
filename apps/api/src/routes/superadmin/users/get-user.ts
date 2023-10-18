import { Request, Response, NextFunction } from "express";
import UserServices from "../../../services/superadmin/users";

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userID: any= req.params.userID;
    const user = await new UserServices().getUser(userID);
    res.status(200).send({
      status: true,
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export default getUserById;
