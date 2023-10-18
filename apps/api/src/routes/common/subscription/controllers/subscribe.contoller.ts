import { NextFunction, Request, Response } from "express";
import Room from "../../../../models/room.model";

import event from "../../../../services/events";

const Subscribe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company_id, _id: userId }: any = req.user;
  

    const responseHandler = async(messages: any) => {
      if(messages.type="message"){
        const _room = await Room.findOne({companies:messages.payload.room_id});
        if(_room){
          res.send(messages);
          event.removeListener("event", responseHandler);
        }
      }
  
    };

    event.on("events", responseHandler);
  } catch (error) {
    console.log("single room fetch error: ", error);
    next(error);
  }
};

export default Subscribe;
