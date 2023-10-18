import { NextFunction, Request, Response } from "express";
import Room from "../../../../../models/room.model";
import ApiError from "../../../../../utils/http.error";
import MessageEvents from "./messageEvent";
const RoomMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company_id,_id }: any = req.user;

    if(!req.params.room_id){
      res.send({message: "not found"});
    }

    const room: any = await Room.findOne({
        _id:req.params.room_id,
      $or: [{ sender_company: company_id }, { receiver_company: company_id }],
    });

    if (!room) {
      throw new ApiError(400, "No Room found");
    }

    const responseHandler = (messages: any) => {


        if(room._id.equals(messages.room_id)&&messages.user_id._id!==_id){
            res.send(messages);
            MessageEvents.removeListener("new_message", responseHandler);
        }

    };

    MessageEvents.on("new_message", responseHandler);
  } catch (error) {
    console.log("single room fetch error: ", error);
    next(error);
  }
};

export default RoomMessages;
