import { Request, Response, NextFunction } from "express";
import UserServices from "../../../services/superadmin/users";


UserServices

const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    let { page, size }: any = req.query;

    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size;
    const user = await new UserServices().getAllUsers(limit, skip);
    res.status(200).send({
      status: true,
      message: "All users fetched successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export default getUsers;
