import { NextFunction, Request, Response } from "express";
import Auction from "../../../../models/auction.model";
import Product from "../../../../models/products.model";
import Order from "../../../../models/orders.model";
import Notification from "../../../../models/notification.model";

const createBuyNow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company }: any = req.user;
    const { id } = req.params;
    const loggedInUser: any = req.user;

    const auction = await Auction.findById(id).lean();

    if (!auction) {
      return res.send({
        status: false,
        message: "auction is not found",
      });
    }
    auction.winner = {
      type: "bid",
      amount: auction.buy_now_price,
      company: company.id,
      date: new Date(),
    };
    auction.status = "awarded";
    await Auction.findByIdAndUpdate(auction?._id, auction);

    const product = await Product.findById(auction.product).lean();
    if (!product) {
      return res.send({
        status: false,
        message: "product is not found",
      });
    }

    const orderData = {
      order_number: Math.floor(1000 + Math.random() * 9000),
      buyer: loggedInUser.company.id,
      seller: product.company.id,
      users: loggedInUser._id,
      order_type: "auction",
      product_list: [
        {
          title: product.title,
          product: product._id,
          price: auction.buy_now_price,
          quantity: auction.total_quantity,
          unit: product.variants[0].unit,
        },
      ],
      timeline: [
        {
          title: `You created this order for ${product?.company?.name}`,
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
      receiver: auction.company,
      text: `Your auction was bought by <strong> #${company.id} </strong>.`,
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

export default createBuyNow;
