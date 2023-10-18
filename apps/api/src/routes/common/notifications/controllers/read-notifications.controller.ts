import moment from "moment";
import NotificationModel from "../../../../models/notification.model";
import { Request, Response, NextFunction } from "express";

export const readNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
try{
  const loggedInUser: any = req.user;

  const queries: any = {
    _id: { $in: req.body },
    $or: [
      {
        notification_type: "individual",
        receiver: loggedInUser.company.id,
      },
      { notification_type: "public" },
    ],
  };

  console.log(queries)

  const notification = await NotificationModel.updateMany(queries,{
    is_read:true
  });

  res.send({
    notification,
  });

}catch(err){
  next(err)
}
};
