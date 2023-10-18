import { IPrice } from "../../interface/price.interface";
import PriceModel from "../../models/price.model";

export const createPrice = async (priceInfo: IPrice) => {
  const price = await PriceModel.create(priceInfo);
  return price;
};
