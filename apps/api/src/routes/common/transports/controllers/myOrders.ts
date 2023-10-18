import { NextFunction, Request, Response } from "express";
import Transport from "../../../../models/transport.model";
import moment from "moment";

const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedInUser: any = req.user;

    const startDate = moment(req.query.startDate as string);
    const endDate = moment(req.query.endDate as string);


    const query: any = {
    };

    if (startDate ){
      console.log("clled")
      query.delivery_date = {
        $gte: startDate.startOf("day").toDate(),
        $lte:startDate.endOf("day").toDate()
      }
    }
    
    // if (startDate && endDate) {
    //   query.delivery_date = {
    //     $gte: startDate.set("hours",0),
    //     $lte:endDate.set("hours",23.59),
    //   }
    // }

    console.log(query)

    if(req.query.driver){
      query.driver = req.query.driver
    }

    if (loggedInUser.transport_id && loggedInUser.role == "driver") {
      query.driver = loggedInUser._id
    }
    if (loggedInUser.role === "admin") {
      query.company = loggedInUser.company.id
    }


    const transports = await Transport.find(query).populate({
      path: 'order',
      model: 'Order',
      select: '_id order_number',
      populate: {
        path: 'buyer',
        model: 'companies',
        select: 'business_name business_logo',
    }
    })

    return res.send({
      status: false,
      transports
    });
  } catch (error) {
    console.log("single room fetch error: ", error);
    next(error);
  }
};

export default getMyOrders;
