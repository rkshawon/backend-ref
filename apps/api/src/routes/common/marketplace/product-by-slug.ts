import { Request, Response, NextFunction } from "express";
import productsModel from "../../../models/products.model";


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedUser: any = req.user;

    let product_query: any = {
      is_deleted: false,
      slug:req.params.slug,
      // company: { $ne: new mongoose.Types.ObjectId(loggedUser.company.id) },
      status: "published",
    };

    const product = await productsModel
      .findOne(product_query)

    res.send({
      status: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};
