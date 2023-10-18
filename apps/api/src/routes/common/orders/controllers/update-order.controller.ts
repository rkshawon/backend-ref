import { Request, Response, NextFunction } from "express";
import Order from "../../../../models/orders.model";
import Notification from "../../../../models/notification.model";

const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const loggedInUser: any = req.user;

    const order:any = await Order.findByIdAndUpdate(req.params.orderId,{
      status:req.body.status,
      product_list:req.body.product_list,$push:{
        timeline:{
          title:"Order successfully updated",
          postedBy:loggedInUser._id,
          createAt:Date.now
          }
      }
    },{
      new:true
    }).populate("product_list.product").populate("buyer");

    await Notification.create({
      sender:order.seller,
      receiver:order.buyer,
      text:`Your order <strong> #${order.order_number} </strong> has been updated. If you have any questions or concerns, please contact our support team.`,
      link: `/orders/myorders/${order._id}`
    })

    res.send({status: true, order});
  } catch (err) {
    next(err);
  }
};
export default updateOrder
