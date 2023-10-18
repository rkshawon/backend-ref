import {Request,Response,NextFunction} from "express";
import productsModel from "../../../models/products.model";
import mongoose from "mongoose"

// interface IQuery{
//   created_by?:ObjectId;
//   company_id?:ObjectId;
//   type?:string;
//   is_deleted:boolean
// }

const query_list=["product_type","category","strain","brand","strain","cultivation_type"]

export default async (req:Request, res:Response,next:NextFunction) => {
  try{


    let product_query:any={
      is_deleted:false,
      product_type:"auction",
      status:"published"
    };

    if(req.query){
      const queries = Object.entries(req.query);
      queries.map(item=>{
        product_query[item[0]]=item[1]
      });
    }


    const products = await productsModel.find(product_query).populate('company');


    res.send({
      status:true,
      products
    })
  
  }catch(err){
    next(err)
  }
  }
  