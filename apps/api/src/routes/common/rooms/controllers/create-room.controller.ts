import { NextFunction, Request, Response } from "express";
import Room from "../../../../models/room.model";
import productsModel from "../../../../models/products.model";
import Order from "../../../../models/orders.model";
import ApiError from "../../../../utils/http.error";
import normalizeRoom from "../utils/reciveridentify";
import mongoose from "mongoose";

// controller for room create
const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { company }: any = req.user;

    let companies = [];
    const context = req.body;
    let topic = "";
    let roomInfo = {};

    if (context.type === "product_qn") {
      if (!context.product_id) {
        throw new ApiError(400, "product_id not found");
      }
      const product: any = await productsModel.findById(context.product_id);

      if (!product) {
        throw new ApiError(400, "Product not found");
      }

      if (product.company.id !== company.id) {
        companies.push(product.company.id);
        companies.push(company.id);

        topic = product.title;
        roomInfo = {
          "context.type": "product_qn",
          "context.product_id": product._id,
        };
      } else {
        throw new ApiError(400, "You can create room for your own product");
      }
    } else if (context.type === "order") {
      if (!context.order_id) {
        throw new ApiError(400, "order_id not found");
      }

      const order: any = await Order.findById(context.order_id);

      if (!order) {
        throw new ApiError(400, "Order not found");
      }

      companies.push(order.buyer);
      companies.push(order.seller);
      topic = order.order_number;
      roomInfo = {
        "context.type": "order",
        "context.order_id": order._id,
      };
    }

    const room = await Room.findOneAndUpdate(
      {
        context: req.body,
        companies: {
          $elemMatch: { $eq: company.id },
        },
      },
      {
        companies,
        topic,
        roomInfo,
      },
      {
        upsert: true,
        new: true,
        lean: true,
      }
    ).populate("companies", "business_name first_name last_name business_logo");

    return res.send({
      room: normalizeRoom(room, company.id),
    });

    // Creating new Rooms
  } catch (error) {
    console.log("room creation error: ", error);
    next(error);
  }
};

export default createRoom;
