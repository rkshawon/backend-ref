import { Request, Response, NextFunction } from "express";
import Order from "../../../../models/orders.model";

const createOrderEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const loggedInUser: any = req.user;


    const order = await Order.findByIdAndUpdate(req.params.id,{
        $push:{
            timeline:[{
              title: req.body.title,
              postedBy:loggedInUser._id,
              createAt:Date.now
            }]
        }
    },{
      new:true
    });
    res.send({status: true, timeline:order?.timeline});
  } catch (err) {
    next(err);
  }
};
export default createOrderEvent
