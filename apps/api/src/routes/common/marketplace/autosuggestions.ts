import { Request, Response, NextFunction } from "express";
import productsModel from "../../../models/products.model";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {


        let product_query: any = {
            is_deleted: false,
            product_type: { $in: ["fixed_price", "partial_order"] },
            status: "published",
            $search: {
                "index": "default", // optional, defaults to "default"
                "autocomplete": {
                    "query": req.query.q,
                    "path": "title",
                    "tokenOrder": "any|sequential"
                }
            }
        }

        console.log(req.query.q)

        const products = await productsModel.aggregate([
            {
              $search: {
                index: "name",
                autocomplete: {
                  query: req.query.q,
                  path: "name",
                  fuzzy: {
                    maxEdits: 1,
                  },
                  tokenOrder: "sequential",
                },
              },
            }
          ]);
        res.send(products)



    } catch (err) {
        next(err)
    }
}
