import { NextFunction, Request, Response } from "express";

import event from "../../../../services/events";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventData = req.body;

    event.emit("events", {
      type: eventData.type,
      payload: eventData.payload,
    });
    res.send(req.body);
  } catch (error) {
    next(error);
  }
};

export default createEvent;
