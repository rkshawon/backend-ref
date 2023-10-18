import { NextFunction, Request, Response } from "express";
import Room from "../../../../models/room.model";
import productsModel from "../../../../models/products.model";
import ApiError from "../../../../utils/http.error";
import Messages from "../../../../models/message.model";
import normalizeRoom from "../utils/reciveridentify";

const productRoomList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: any = await productsModel.findById(req.params.product_id);
    const {company}: any = req.user;


    if (!product) {
      throw new ApiError(400, "Product is not found");
    }

    const rooms= await Room.find(
      {
        context: {
          type:"product_qn",
          product_id:product._id
        }
      }
    ).populate("companies", "business_name first_name last_name business_logo")
    .lean()



    if (!rooms) {
      throw new ApiError(400, "No Room found");
    }

    await Promise.all(
      rooms.map(async (room: any) => {
        const messages = await Messages.find({ room_id: room._id })
          .sort({ createdAt: -1 })
          .populate("user_id", "first_name last_name profile_pic")
          .limit(1);

        room.messages = messages;
        return normalizeRoom(room,company.id)
      
      })
    );
    
    return res.send({
      rooms
    });
  } catch (error) {
    console.log("single room fetch error: ", error);
    next(error);
  }
};

export default productRoomList;
