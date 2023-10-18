import ApiError from "../../utils/http.error";
import PriceModel from "../../models/price.model";

export const getPrices = async (): Promise<any> => {
  try {
    const price = await PriceModel.find({})
    return price;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "price list fetching failed");
  }
};
