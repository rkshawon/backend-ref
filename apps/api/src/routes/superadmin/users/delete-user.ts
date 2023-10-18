import { Request, Response, NextFunction } from "express";
import UserServices from "../../../services/superadmin/users";

const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userID: any = req.params.id;
    const user = await new UserServices().deleteUser(userID);
    if (!user._id) {
      res.status(404).send({
        status: false,
        message: "No records found regarding this id",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "Company deleted successfully",
        user,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
