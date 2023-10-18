import {Request,Response,NextFunction} from "express";
import productsModel from "../../../../models/products.model";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:Request, res:Response,next:NextFunction) => {
  try{

    const loggedInUser: any = req.user;
    let producs={
      ...req.body,
      created_by:{
        first_name:loggedInUser.first_name,
        last_name:loggedInUser.last_name,
        id:loggedInUser._id
      },
      company:loggedInUser.company
    };

    const product = await productsModel.create(producs)

    res.send({
      status:true,
      product
    })
  
  }catch(err){
    next(err)
  }
  }
  