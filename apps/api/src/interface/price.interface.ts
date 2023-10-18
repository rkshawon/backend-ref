import { Document } from "mongoose";


export interface IPrice extends Document {
    product_name:string,
    amount:number
}