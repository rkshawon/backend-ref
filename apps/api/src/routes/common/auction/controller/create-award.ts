import { NextFunction, Request, Response } from "express";
import Auction from "../../../../models/auction.model";
import Bid from "../../../../models/bid.model";
import Order from "../../../../models/orders.model";
import Product from "../../../../models/products.model";
import Notification from "../../../../models/notification.model";

const createAward = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company }: any = req.user;
    const { id } = req.params;
    const loggedInUser: any = req.user;

    const { bid_id } = req.body;
    const bid = await Bid.findById(bid_id);

    if (!bid) {
      return res.send({
        status: false,
        message: "bid not found",
      });
    }

    const auction = await Auction.findById(id).lean();

    if (!auction) {
      return res.send({
        status: false,
        message: "auction is not found",
      });
    }

    auction.winner = {
      type: "bid",
      amount: bid.bid_amount,
      company: bid.company,
      date: bid.updatedAt,
      bid_id: bid._id,
    };

    auction.status = "awarded";
    await Auction.findByIdAndUpdate(auction?._id, auction);

    const product = await Product.findById(auction.product);
    if (!product) {
      return res.send({
        status: false,
        message: "product is not found",
      });
    }

    if (!product) {
      return res.send({
        status: false,
        message: "product is not found",
      });
    }

    const orderData = {
      order_number: Math.floor(1000 + Math.random() * 9000),
      buyer: bid.company,
      seller: product.company.id,
      users: loggedInUser._id,
      order_type: "auction",
      product_list: [
        {
          title: product.title,
          product: product._id,
          price: bid.bid_amount,
          quantity: auction.total_quantity,
          unit: product.variants[0].unit,
        },
      ],
      timeline: [
        {
          title: `You created this order for ${product?.company.name}`,
          postedBy: loggedInUser?._id,
          createAt: Date.now,
        },
      ],
    };

    const order = await Order.create(orderData);

    await Notification.create({
      sender: order.seller,
      receiver: order.buyer,
      text: `Your order <strong> #${order.order_number} </strong> has been received and is being processed.`,
      link: `/orders/myorders/${order._id}`,
    });

    await Notification.create({
      sender: company.id,
      receiver: bid.company,
      text: `You won a auction.`,
      link: `/auctions/products/${id}`,
    });

    res.send({
      status: true,
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};

export default createAward;
