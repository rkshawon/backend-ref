import { Request, Response, NextFunction } from "express";
import AuthServices from "../../services/auth/index.services";

const setPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const user = await new AuthServices().setPassword(
      req.params.token,
      req.body.password
    );
    res.send(user);
  } catch (err) {
    next(err);
  }
};

export default setPassword;
