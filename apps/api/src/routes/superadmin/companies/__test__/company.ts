import supertest from "supertest";
import CannabisConnector from "../../../../app";
import httpStatus from "http-status";
import setupTestDB from "../../../../utils/setupTestDB";
import {
  companyPayload,
  companyPayloadWithoutRequired,
  duplicateEmailPayload,
} from "./company.dummyData";

const app = new CannabisConnector().app;
setupTestDB();

describe("Company routes", () => {
  describe("Create company", () => {
    it("should response with 200 status code with unique contact email", async () => {
      const res = await supertest(app)
        .post("/api/v1/companies")
        .send(companyPayload)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("_id");
    });
  });

  describe("PATCH Verify company", () => {
    it("should response 200 if company is successfully verified", async () => {
      const res = await supertest(app)
        .patch("/api/v1/superadmin/companies/verify/63591cd9c3f4919fe703b4b4")
        .expect(httpStatus.OK);

      expect(res.body).toMatchObject({
        status: res.body.status,
        message: res.body.message,
      });
    });
  });

  describe("PATCH Verify company", () => {
    it("should response 200 if company is already verified", async () => {
      const res = await supertest(app)
        .patch("/api/v1/superadmin/companies/verify/63591cd9c3f4919fe703b4b4")
        .expect(httpStatus.OK);

      expect(res.body).toMatchObject({
        status: res.body.status,
        message: res.body.message,
      });
    });
  });

  describe("PATCH Verify company", () => {
    it("should response 401 if company doesn't exist", async () => {
      const res = await supertest(app)
        .patch("/api/v1/superadmin/companies/verify/63577050d35ecb6eea94a900")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toMatchObject({
        status: res.body.status,
        message: res.body.message,
        code: httpStatus.UNAUTHORIZED,
      });
    });
  });

  describe("Check validation", () => {
    it("should occur validation error", async () => {
      const res = await supertest(app)
        .post("/api/v1/companies")
        .send(companyPayloadWithoutRequired);

      expect(res.body).toMatchObject({
        status: false,
        code: 500,
      });
    });
  });

  describe("Contact email duplication check", () => {
    it("should response contact email duplication error", async () => {
      const res = await supertest(app)
        .post("/api/v1/companies")
        .send(duplicateEmailPayload);

      expect(res.statusCode).toEqual(400);

      expect(res.body).toMatchObject({
        status: false,
        message: "Email has been created with ${isExist.license_type} exist",
        code: 400,
      });
    });
  });

  // test get all company api endpoint | total test case:2
  describe("Get all companies", () => {
    it("should fetch all companies", async () => {
      const res = await supertest(app)
        .get("/api/v1/superadmin/companies")
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("companies");
    });
  });

  describe("Check pagination with limit", () => {
    it("should return paginated values with limit", async () => {
      const res = await supertest(app)
        .get(`/api/v1/superadmin/companies?page=${2}&size=${2}`)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("companies");
    });
  });

  // test update company api endpoint | total test case:3
  describe("Update company", () => {
    it("should update company details", async () => {
      const res = await supertest(app)
        .put(`/api/v1/superadmin/companies/6356592dbd574521fd231c2f`)
        .send({
          business_name: "Software Business",
          contact_name: "Razu",
          country: "Bangladesh",
        })
        .expect(httpStatus.OK);
      expect(res.body).toMatchObject({
        status: true,
        message: "Company updated successfully",
        company: res.body.company,
      });
    });
  });

  describe("Checking Invalid Company ID", () => {
    it("Should response error if company id isn't mongoose ID", async () => {
      const res = await supertest(app)
        .put(`/api/v1/superadmin/companies/${343434}`)
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          business_name: "Software Business",
          contact_name: "Razu",
          country: "Bangladesh",
        });

      expect(res.body).toMatchObject({
        status: false,
        message: res.body.message,
        code: 500,
      });
    });
  });

  describe("Checking Existence of Company ID", () => {
    it("Should response error if company id isn't exist", async () => {
      const res = await supertest(app)
        .put(`/api/v1/superadmin/companies/62f2215379d67956c026da29`)
        .send({
          business_name: "Software Business",
          contact_name: "Razu",
          country: "Bangladesh",
        })
        .expect(httpStatus.NOT_FOUND);

      expect(res.body).toMatchObject({
        status: false,
        message: res.body.message,
      });
    });
  });

  describe("Delete company", () => {
    it("should delete a company", async () => {
      const res = await supertest(app)
        .delete(`/api/v1/superadmin/companies/6358d6956ccbc9908cd744e3`)
        .expect(httpStatus.OK);

      expect(res.body).toMatchObject({
        status: true,
        message: res.body.message,
      });
    });
  });
});
