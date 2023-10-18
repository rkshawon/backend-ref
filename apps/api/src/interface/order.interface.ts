import { Document, Types } from "mongoose";

// interface IShippingAddress {
//   street: string;
//   city: string;
//   state: string;
//   country: string;
// }

// interface ICustomerInformation {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   shipping_address: IShippingAddress;
// }

export interface IProductList {
  product_id: Types.ObjectId;
  product_company: Types.ObjectId;
  title: string;
  price: number;
  quantity: number;
  unit: string;
  img: string;
}
export interface ITimeline {
  message: string;
}

export interface IOrder extends IProductList, Document {
  // customer_information: ICustomerInformation;
  product_list: Array<IProductList>;
  order_number: string;
  users: Types.ObjectId;
  companies: Types.ObjectId;
  buyer: Types.ObjectId;
  seller: Types.ObjectId;
  status: string;
  timeline: Array<ITimeline>;
  delivery_schedule: Types.ObjectId;
  order_type: string;
}
