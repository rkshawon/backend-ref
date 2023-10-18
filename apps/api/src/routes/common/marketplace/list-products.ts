import { Request, Response, NextFunction } from "express";
import productsModel from "../../../models/products.model";
import mongoose from "mongoose";

// interface IQuery{
//   created_by?:ObjectId;
//   company_id?:ObjectId;
//   type?:string;
//   is_deleted:boolean
// }

const query_list = [
  "product_type",
  "category",
  "strain",
  "brand",
  "strain",
  "cultivation_type",
];

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedUser: any = req.user;


    console.log(loggedUser)
    let product_query: any = {
      is_deleted: false,
      "company.id": {$ne:loggedUser.company.id},
      status: "published",
    };

    if(req.query){
      const queries = Object.entries(req.query);
      queries.map(item=>{
        product_query[item[0]]=item[1]
      });
    }



    const products = await productsModel
      .find(product_query)
      .sort({ createdAt: -1 })


    res.send({
      status: true,
      products,
    });
  } catch (err) {
    next(err);
  }
};
