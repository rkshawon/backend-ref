import { Request, Response, NextFunction } from "express";
import UserServices from "../../../services/superadmin/users";

const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const body: any = req.body;
    const userID: any = req.params.id;
    // const loggedUser = req.user.id
    const user = await new UserServices().updateUser(body, userID);

    if (!user._id) {
      res.status(404).send({
        status: false,
        message: "No records found regarding this id",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "User updated successfully",
        user,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default updateUser;
