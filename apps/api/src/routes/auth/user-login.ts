import { Request, Response, NextFunction } from "express";
import AuthServices from "../../services/auth/index.services";

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const user = await new AuthServices().login(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

export default login;
