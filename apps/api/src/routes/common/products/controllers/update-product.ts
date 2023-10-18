
import { Request, Response, NextFunction } from "express";
import productsModel from "../../../../models/products.model";
import mongoose from "mongoose"
var slugify = require('slugify')


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
  try {

    const loggedInUser: any = req.user;

    const key = Object.keys(req.body).join(" ")

    if(req.body.title){
      req.body.slug=`${slugify(req.body.title)}-${Date.now()}`;
    }

    const product = await productsModel.findOneAndUpdate({
      _id: new mongoose.Types.ObjectId(req.params.product_id),
      company_id: new mongoose.Types.ObjectId(loggedInUser.company.id),
    }, req.body, {
      new: true
    }).select(key)


    res.send({
      status: true,
      product
    })

  } catch (err) {
    next(err)
  }
}
