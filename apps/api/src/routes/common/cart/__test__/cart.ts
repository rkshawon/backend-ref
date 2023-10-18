import request from "supertest";
import httpStatus from "http-status";
import CannabisConnector from "../../../../app";
import setupTestDB from "../../../../utils/setupTestDB";

const app = new CannabisConnector().app;

setupTestDB();

const product = {
  product_id: "63142c8d474693fb00918b06",
  price: 80,
  unit: "12",
  title: "Bluetooth",
  quantity: 100,
  img: "sfjkhskjf",
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM1NjVjMTU0MzRkZDM3NmFkNGFiOWNjIiwiY29tcGFueV9pZCI6IjYzNTY1OTJkYmQ1NzQ1MjFmZDIzMWMyZiIsImlhdCI6MTY2Njc4MDQ3NX0.Ezp4WnVCAjI6nOyRo8QSG8xJ8_DFAwAF1lNYAUhergM";

describe("Cart routes", () => {
  describe("POST /api/v1/growers/cart", () => {
    test("should return 401 if user is unauthorized", async () => {
      await request(app)
        .post("/api/v1/growers/carts")
        .send(product)
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe("POST /api/v1/growers/cart", () => {
    test("should return 200 if user is authorized", async () => {
      const res = await request(app)
        .post("/api/v1/growers/carts")
        .set({ Authorization: `Bearer ${token}` })
        .send(product)
        .expect(httpStatus.OK);

      expect(res.body).toMatchObject({
        status: true,
        message: res.body.message,
        cart: res.body.cart,
      });
    });
  });

  describe("POST /api/v1/growers/cart", () => {
    test("should return 500 if request body is empty", async () => {
      const res = await request(app)
        .post("/api/v1/growers/carts")
        .set({ Authorization: `Bearer ${token}` })
        .send({})
        .expect(httpStatus.INTERNAL_SERVER_ERROR);

      expect(res.body).toMatchObject({
        status: false,
        message: res.body.message,
        code: httpStatus.INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe("GET /api/v1/growers/cart", () => {
    test("should return 200 if user is authorized", async () => {
      const res = await request(app)
        .get("/api/v1/growers/carts")
        .set({ Authorization: `Bearer ${token}` })
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("cart");
    });
  });

  describe("DELETE /api/v1/growers/cart", () => {
    test("should return 200 if user is authorized and ID is exist", async () => {
      const res = await request(app)
        .delete("/api/v1/growers/carts/63142c8d474693fb00918b07")
        .set({ Authorization: `Bearer ${token}` })
        .expect(httpStatus.OK);

      expect(res.body).toMatchObject({
        status: true,
        message: res.body.message,
      });
    });
  });

  describe("DELETE /api/v1/growers/cart", () => {
    test("should return 404 if ID isn't exist", async () => {
      const res = await request(app)
        .delete("/api/v1/growers/carts/63142c8d474693fb00918b07")
        .set({ Authorization: `Bearer ${token}` })
        .expect(httpStatus.NOT_FOUND);

      expect(res.body).toMatchObject({
        status: false,
        message: res.body.message,
        code: httpStatus.NOT_FOUND,
      });
    });
  });

  describe("DELETE /api/v1/growers/cart", () => {
    test("should return 500 if ID isn't mongoose ID", async () => {
      const res = await request(app)
        .delete("/api/v1/growers/carts/3333")
        .set({ Authorization: `Bearer ${token}` })
        .expect(httpStatus.INTERNAL_SERVER_ERROR);

      expect(res.body).toMatchObject({
        status: false,
        message: res.body.message,
        code: httpStatus.INTERNAL_SERVER_ERROR,
      });
    });
  });
});
