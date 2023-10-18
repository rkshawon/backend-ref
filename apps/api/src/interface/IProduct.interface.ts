import { Document } from "mongoose";

interface ProductImage {
  src: string;
  position: number;
  product_id: string;
}

interface IProduct extends Document {
  product_type: string;
  name: string;
  category: string;
  brand: string;
  strain: string;
  thc: number;
  total_cannabinoid: number;
  tarpenes: number;
  description: string;
  batch_size: number;
  batch_number: number;
  unit: string;
  min_qty_lb: Number;
  min_qty_g: Number;
  price_per_g: Number;
  price_per_lb: Number;
  quantity: number;
  cultivation_type: string;
  images: Array<ProductImage>;
  certificate: string;
  status: string;
  // bellow three field when product_type: auctions
  created_by: string;
  company: {
    license_type: String;
    name: String;
    id: String;
  };
  allocations: {};
  title: string;
  variants: [
    {
      unit: string;
      quantity: number;
      options: [];
    }
  ];
}

export default IProduct;
