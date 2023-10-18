import { Types } from "mongoose";

export interface IDeliverySchedule {
  date: Date;
  driver: Types.ObjectId;
  vehicle: Types.ObjectId;
  metrc_status: "pending" | "approved" | "rejected";
  isScheduled: Boolean;
  isTripStarted: Boolean;
  gps: Types.ObjectId;
  orders: Order[];
  full_planned_routes: Routes[];
  company: Types.ObjectId;
}

interface Order {
  order_id: string;
  order_number: string;
  arrival_time: string;
  departure_time: string;
  status: string;
  planned_routes: Record<string, unknown>;
}
export interface Routes {
  pickup: string;
  destination: string;
  lng: number;
  lat: number;
}
