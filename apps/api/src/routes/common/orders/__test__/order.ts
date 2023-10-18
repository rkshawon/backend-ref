import mongoose from "mongoose";
import request from "supertest";
import httpStatus from "http-status";
import CannabisConnector from "../../../../app";
import MongooseConnect from "../../../../config/mongodb.config";

const Cannabis = new CannabisConnector().app;

describe("company", () => {
  beforeAll(async () => {
    MongooseConnect();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  const order = {
    customer_information: {
      first_name: "Rony",
      last_name: "Barua",
      email: "rony@gmail.com",
      phone: "04543543",
      shipping_address: {
        state: "Uttara",
        street: "345 lane",
        city: "Dhaka",
        country: "Bangladesh",
      },
    },
    product_list: [
      {
        product_id: "63142c8d474693fb00918b07",
        title: "Bluetooth",
        price: 80,
        quantity: 100,
        unit: "12",
      },
      {
        product_id: "63142c8d474693fb00918b09",
        title: "Bluetooth",
        price: 80,
        quantity: 100,
        unit: "12",
      },
    ],
    users: "634d2c503322f5d68b820917",
    companies: "630070f97333b5c2a6940873",
  };

  // test add product to cart api endpoint | total test case:3
  describe("POST /api/v1/growers/orders", () => {
    test("should return 401 if user is unauthorized", async () => {
      await request(Cannabis).post("/api/v1/growers/orders").send(order).expect(httpStatus.UNAUTHORIZED);
    });
  });
});
