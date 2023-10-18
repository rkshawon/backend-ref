import { NextFunction, Request, Response } from "express";
import usersModel from "../../../../models/users.model";

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id }: any = req.user;

    if (req.body.companies) {
      delete req.body.companies;
    }

    const keys = Object.keys(req.body).join(" ");

    const updatedUser = await usersModel
      .findByIdAndUpdate(_id, req.body, { new: true })
      .select(keys);

    res.status(200).send(updatedUser);
  } catch (error) {
    console.log({ error });
  }
};

export default updateUser;
