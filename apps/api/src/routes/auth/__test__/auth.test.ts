import request from "supertest";
import httpStatus from "http-status";
import setupTestDB from "../../../utils/setupTestDB";
import CannabisConnector from "../../../app";

const app = new CannabisConnector().app;

setupTestDB();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTc3MGQxZDM1ZWNiNmVlYTk0YTk1ZiIsImlhdCI6MTY2NjY3NDg5N30.mpeJcrVrAlwxEiaIyj7xsuudKcJ41t5RSpNL-hln_F4";

describe("Auth routes", () => {
  describe("POST Set Password", () => {
    test("should return 200 if password is set successfully", async () => {
      const res = await request(app)
        .post(`/api/v1/auth/set-password/${token}`)
        .send({ password: "123" })
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("_id");
    });

    describe("POST /api/v1/auth/login", () => {
      test("should return 200 and login user if email and password match", async () => {
        const loginCredentials = {
          email: "ronybarua.corexlab@gmail.com",
          password: "123",
        };

        const res = await request(app)
          .post("/api/v1/auth/login")
          .send(loginCredentials)
          .expect((res) => console.log(res))
          .expect(httpStatus.OK);

        expect(res.body).toHaveProperty("accessToken");
      });

      test("should return 401 error if there are no users with that email", async () => {
        const loginCredentials = {
          email: "ronybaruat.corexlab@gmail.com",
          password: "123",
        };

        const res = await request(app)
          .post("/api/v1/auth/login")
          .send(loginCredentials);

        expect(res.statusCode).toEqual(400);

        expect(res.body).toEqual({
          status: false,
          message: "User Not Found",
          code: 400,
        });
      });

      test("should return 401 error if password is wrong", async () => {
        const loginCredentials = {
          email: "ronybarua.corexlab@gmail.com",
          password: "123rete",
        };

        const res = await request(app)
          .post("/api/v1/auth/login")
          .send(loginCredentials)
          .expect(httpStatus.UNAUTHORIZED);

        expect(res.body).toEqual({
          code: httpStatus.UNAUTHORIZED,
          status: false,
          message: "User given credential is wrong",
        });
      });
    });
  });
});
