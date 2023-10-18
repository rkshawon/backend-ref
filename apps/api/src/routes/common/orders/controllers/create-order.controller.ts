import { Request, Response, NextFunction } from "express";
import Order from "../../../../models/orders.model";
import Product from "../../../../models/products.model";
import Cart from "../../../../models/cart.model";

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const loggedInUser: any = req.user;

    req.body.order_number = Math.floor(1000 + Math.random() * 9000);
    req.body.buyer = loggedInUser.company.id;
    req.body.users = loggedInUser._id;

    const allOrders: any = [];

    let orders = req.body.product_list.map(async (item: any) => {
      const product = await Product.findById(item.product);

      if (product) {
        const sellerIndex = allOrders.findIndex((item: any) =>
          item.seller.equals(product.company.id)
        );

        console.log(item);

        if (sellerIndex === -1) {
          allOrders.push({
            order_number: Math.floor(1000 + Math.random() * 9000),
            product_list: [item],
            seller: product?.company.id,
            buyer: loggedInUser.company.id,
            users: loggedInUser._id,
            timeline: [
              {
                title: `You created this order for ${product?.company.name}  `,
                postedBy: loggedInUser._id,
                createAt: Date.now,
              },
            ],
          });
        } else {
          allOrders[sellerIndex].product_list.push(item);
        }
      }
    });

    Promise.all(orders).then(async () => {
      await Order.insertMany(allOrders);
      await Cart.findOneAndDelete({ company: loggedInUser.company.id });
    });

    res.send({ status: true, message: "Order has place successfully " });
  } catch (err) {
    next(err);
  }
};
export default createOrder;
