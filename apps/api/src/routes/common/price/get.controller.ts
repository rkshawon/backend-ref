import { Request, Response, NextFunction } from "express";
import PriceService from "../../../services/price";

const getPrices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const price = await PriceService.getPrices();
    res.send({ price, status: true, message: "Prices fetched successfully" });
  } catch (err) {
    next(err);
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default getPrices
