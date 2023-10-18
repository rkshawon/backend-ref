import mongoose from "mongoose";
import ApiError from "../../utils/http.error";
import PriceModel from "../../models/price.model";

export const deletePrice = async (
  priceId: mongoose.Types.ObjectId
): Promise<any> => {
  const isPriceExist = await PriceModel.findById({ _id: priceId });
  if (isPriceExist) {
    const price = await PriceModel.findByIdAndDelete({ _id: priceId });
    return price;
  } else {
    throw new ApiError(404, "Price not found");
  }
};
