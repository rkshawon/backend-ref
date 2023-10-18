import {Request,Response,NextFunction} from "express";
import productsModel from "../../../../models/products.model";
import mongoose from "mongoose"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:Request, res:Response,next:NextFunction) => {
  try{

    const loggedInUser: any = req.user;


    const products = await productsModel.findOneAndUpdate({
      _id:new mongoose.Types.ObjectId(req.params.product_id),
      company_id:loggedInUser.company.id
    },{
      is_deleted:true
    })

    console.log(products)


    res.send({
      status:true,
      message:"Product successfully deleted"
    })
  
  }catch(err){
    next(err)
  }
  }
  