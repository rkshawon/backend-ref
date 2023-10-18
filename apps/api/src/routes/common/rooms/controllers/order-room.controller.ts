import { NextFunction, Request, Response } from "express";
import { IRoom } from "../../../../interface/IRooms.interface";
import Messages from "../../../../models/message.model";
import Order from "../../../../models/orders.model";
import Room from "../../../../models/room.model";
import ApiError from "../../../../utils/http.error";
import normalizeRoom from "../utils/reciveridentify";

const orderRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.order_id) {
      throw new ApiError(400, "Please provide orderId");
    }

    const { _id, company }: any = req.user;

    const order: any = await Order.findOne({ _id: req.params.order_id });

    if (!order) {
      throw new ApiError(400, "Order is not found");
    }


    // let sender_company = order.buyer;
    // let receiver_company = order.seller;
    const companies = [order.buyer, order.seller];

    const _room: any = await Room.findOne({
      "context.order_id": order._id,
    })
      .populate("companies", "business_name first_name last_name business_logo")
      .lean();

    if (!_room) {
      return res.send({
        room: {}
      });
    }
    
    const messages = await Messages.find({ room_id: _room._id })
      .limit(10)
      .populate("user_id", "first_name last_name");

    return res.send({ room:normalizeRoom(_room, company.id), messages });

    // let room = await Room.create({
    //   sender_id,
    //   companies,
    //   topic: order.order_id,
    //   context: {
    //     type: "order",
    //     order_id: order._id,
    //   },
    // });

    // const new_room:any = await Room.findById(room._id).populate("companies", "business_name first_name last_name business_logo").lean()

    // const { limit = 20 }: any = req.query;

    // const messages = await Messages.find({ room_id: room._id })
    //   .sort({ createAt: -1 })
    //   .limit(limit)
    //   .populate("user_id", "user_id.first_name user_id.last_name");

    // return res.send({ room: normalizeRoom(new_room, company_id), messages });
  } catch (error) {
    console.log("single room fetch error: ", error);
    next(error);
  }
};

export default orderRoom;
