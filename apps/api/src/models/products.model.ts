var slugify = require("slugify");
import mongoose, { model, Schema } from "mongoose";
import IProduct from "../interface/IProduct.interface";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    specifications: {},
    images: [String],
    batch: {
      size: {
        type: String,
      },
      number: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    variants: [
      {
        sku: String,
        options: [
          {
            title: String,
            value: String,
          },
        ],
        unit: String,
        quantity: Number,
      },
    ],
    allocations: {
      quantity: String,
      unit: String,
      marketplace: {
        quantity: Number,
        min_qty_g: Number,
        min_qty_lb: Number,
        price_per_lb: Number,
        price_per_g: Number,
      },
      // auction: [
      //   {
      //     total_quantity: Number,
      //     bids_received: Number,
      //     start_date: Date,
      //     duration: Number,
      //     reserve_price: Number,
      //     buy_now_price: Number,
      //   },
      // ],
    },
    created_by: {
      first_name: String,
      last_name: String,
      id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    },
    company: {
      license_type: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      id: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        required: true,
      },
    },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Slug Generator
ProductSchema.pre("save", async function (next) {
  this.slug = `${slugify(this.title)}-${Date.now()}`;
  next();
});

export default model<IProduct>("products", ProductSchema);
