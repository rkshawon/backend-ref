import moment from "moment";
import NotificationModel from "../../../../models/notification.model";
import {Request,Response,NextFunction} from "express";


export const getNotifications = async (req:Request, res:Response,next:NextFunction): Promise<any> => {

  let { page, size } = req.query as any;
  if (!page) {
    page = 0;
  }
  if (!size) {
    size = 20;
  }

  const loggedInUser: any = req.user;




  console.log(loggedInUser.company.id)

  const limit = parseInt(size);
  const skip = page * size;

  const queries: any = {
    $or: [
      {
        notification_type: "individual",
        receiver: loggedInUser.company.id
      },
      { notification_type: "public" },
    ],
  };

  const total_notifications = await NotificationModel.find({
    ...queries,
    is_read: false,
  }).countDocuments();

  const notification = await NotificationModel.find(queries)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .lean();

    res.send({
        total_notifications:total_notifications,
        limit,
        page,
        notification
    })



  
};