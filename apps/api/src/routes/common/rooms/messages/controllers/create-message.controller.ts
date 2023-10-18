import { NextFunction, Request, Response } from "express";
import Messages from "../../../../../models/message.model";
import event from "../../../../../services/events";
// import MessageEvents from "./messageEvent";

// controller for room create
const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { _id }: any = req.user;

    let message = await Messages.create({
      user_id: _id,
      room_id: req.body.room_id,
      text: req.body.text,
    });
    message = await message.populate(
      "user_id",
      "first_name last_name profile_pic"
    );

    event.emit("event", {
      type: "message",
      payload: message,
    });

    res.send(message);
  } catch (error) {
    console.log("room creation error: ", error);
    next(error);
  }
};

export default createMessage;
