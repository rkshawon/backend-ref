import { NextFunction, Request, Response } from "express";
import axios from "axios";
import FacilitiesModel from "../../../models/facilities.model";

const scrapingFacilities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { license_number } = req.params;

    const apidata = await axios.get(
      `https://omma.us.thentiacloud.net/rest/public/profile/search/?keyword=${license_number}`
    );

    const facilities: any = await FacilitiesModel.findOne({ license_number });
    if (!facilities) {
      return res.status(404).json({ status: false, message: "Data not found" });
    }

    //updating facilities data

    if (apidata.data.result[0]) {
      const result = apidata.data.result[0];

      if (
        result.licenseType === "grower" ||
        result.licenseType == "dispensary"
      ) {
        facilities.license_type = result.licenseType;
      }

      if (result.legalName) {
        facilities.business_name = result.legalName;
      }
      if (result.country) {
        facilities.country = result.country;
      }
      if (result.county) {
        facilities.county = result.county;
      }
      if (result.city) {
        facilities.city = result.city;
      }
      if (result.tradeName) {
        facilities.dba = result.tradeName;
      }
      if (result.email) {
        facilities.email = result.email;
      }
      if (result.phone) {
        facilities.phone = result.phone;
      }
      if (result.licenseExpiryDate) {
        facilities.licenseExpiryDate = result.licenseExpiryDate;
      }
      if (result.streetAddress) {
        facilities.address.street = result.streetAddress;
      }
      if (result.zip) {
        facilities.address.zip = result.zip;
      }
    }

    await facilities.save();

    res.send({
      status: true,
      data: facilities,
    });
  } catch (err) {
    next(err);
  }
};

export default scrapingFacilities;

// (facilities.business_name = result.legalName),
//   (facilities.country = result.country),
//   (facilities.county = result.county),
//   (facilities.city = result.city),
//   (facilities.dba = result.tradeName),
//   (facilities.email = result.email),
//   (facilities.phone = result.phone),
//   (facilities.licenseExpiryDate = result.licenseExpiryDate),
//   (facilities.address.street = result.streetAddress),
//   (facilities.address.zip = result.zip);
