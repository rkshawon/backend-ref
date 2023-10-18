import { Request, Response, NextFunction } from "express";
import PriceServices from '../../../services/price'

const createPrice = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const price = await PriceServices.createPrice(req.body);
    res.send({ price, status: true, message: "Price created successfully" });
  } catch (err) {
    next(err);
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default createPrice