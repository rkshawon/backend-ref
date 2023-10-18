import { Request, Response, NextFunction } from "express";
import productsModel from "../../../../models/products.model";
import mongoose from "mongoose"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loggedInUser: any = req.user;
        let query:any=req.query.q;
        let product_query:any={
            created_by:new mongoose.Types.ObjectId(loggedInUser._id),
            company_id:new mongoose.Types.ObjectId(loggedInUser.company_id),
            $or:[{
                name:new RegExp(query,"i"),
            },{
                brand: new RegExp(query,"i"),
            }],
            is_deleted:false,
          };

        const products = await productsModel.find(product_query).limit(20);


        res.send({
            status: true,
            products
        })

    } catch (err) {
        next(err)
    }
}
