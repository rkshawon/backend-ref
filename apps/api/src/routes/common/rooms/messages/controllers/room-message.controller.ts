import { NextFunction, Request, Response } from "express";
import Room from "../../../../../models/room.model";
import ApiError from "../../../../../utils/http.error";
import Messages from "../../../../../models/message.model";
import mongoose from "mongoose";

const RoomMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company_id }: any = req.user;

    const room: any = await Room.findById(req.params.room_id);

    console.log(room)
    if (!room) {
      throw new ApiError(400, "No Room found");
    }

    const { page = 1, limit = 20 }: any = req.query;

    const messages = await Messages.find({ room_id: room._id })
      .sort({ createAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .populate("user_id", "first_name last_name profile_pic");

    res.send({
      messages,
    });
  } catch (error) {
    console.log("single room fetch error: ", error);
    next(error);
  }
};

export default RoomMessages;
