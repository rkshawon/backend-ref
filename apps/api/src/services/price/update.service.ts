import mongoose from "mongoose";
import PriceModel from "../../models/price.model";
import ApiError from "../../utils/http.error";

export const updatePrice = async (
  priceId: mongoose.Types.ObjectId,
  priceInfo: any
): Promise<any> => {
  const isPriceExist = await PriceModel.findById({ _id: priceId });
  if (isPriceExist) {
    const price = await PriceModel.findByIdAndUpdate(
      { _id: priceId },
      priceInfo,
      {
        new: true,
      }
    );
    return price;
  } else {
    throw new ApiError(404, "Price not found");
  }
};
