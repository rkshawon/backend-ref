import CompanyServices from "../../services/users/companies/companies.services";
import { Request, Response, NextFunction } from "express";
import Facilities from "../../models/facilities.model";
import addUser from "./add-user_directly";

const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    let body: any;
    const { license_number } = req.body;

    const facilities = await Facilities.findOne({ license_number }).lean();

    if (facilities) {
      body = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        contact_email: facilities.email,
        contact_number: facilities.phone,
        city: facilities.city,
        county: facilities.county,
        country: facilities.country,
        dba: facilities.dba,
        license_number: facilities.license_number,
        business_name: facilities.business_name,
        license_type: facilities.license_type,
        license_status: "registered",
        address: {
          state: facilities.state,
          street: req.body.address.street,
          coordinates: req.body.address.coordinates,
          zip: facilities.address.zip,
        },
      };
    }

    const company = await new CompanyServices().create(body);

    await addUser(req, res, next, body, company);
  } catch (err) {
    next(err);
  }
};

export default createCompany;
