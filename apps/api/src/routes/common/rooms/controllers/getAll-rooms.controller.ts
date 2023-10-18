import { NextFunction, Request, Response } from "express";
import Room from "../../../../models/room.model";
import Messages from "../../../../models/message.model";
import normalizeRoom from "../utils/reciveridentify";

// Controller for get single room against product/order
const getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company }: any = req.user;
    const rooms = await Room.find({companies:{$in:[company.id]} }).populate("companies", "business_name first_name last_name business_logo").lean()
      .sort({ createdAt: -1 })
      .lean();

    await Promise.all(
      rooms.map(async (room: any, index: number) => {
        if (index === 0) {
          const messages = await Messages.find({ room_id: room._id })
            .sort({ createdAt: -1 })
            .populate("user_id", "first_name last_name profile_pic")
            .limit(20);
          room.messages = messages;
        } else {
          const messages = await Messages.find({ room_id: room._id })
            .sort({ createdAt: -1 })
            .populate("user_id", "first_name last_name profile_pic")
            .limit(1);
          room.messages = messages;
        }

        normalizeRoom(room, company.id);
      })
    );

    res.send(rooms);
  } catch (error) {
    console.log("single room fetch error: ", error);
    next(error);
  }
};

export default getAllRooms;
