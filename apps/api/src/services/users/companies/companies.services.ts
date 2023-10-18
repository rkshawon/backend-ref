import { ObjectId } from "mongoose";
import ICompanies from "../../../interface/companies.interface";
import companiesModel from "../../../models/companies.model";
import ApiError from "../../../utils/http.error";
import sendEmail from "../../mail";
import userCompany from "./get-user-company";

class CompanyServices {
  private Company = companiesModel;
  private GetUserCompany = userCompany;

  public userCompany = this.GetUserCompany;

  public create = async (companyDetails: ICompanies): Promise<ICompanies> => {
    const company = await this.Company.findOne({
      contact_email: companyDetails.contact_email,
      license_type: companyDetails.license_type,
    });
    //  `Email has been created with ${isExit.license_type} exist`
    if (company) {
      throw new ApiError(
        400,
        `Email has been created with ${company.license_type} exist`
      );
    }
    const _company = await this.Company.create(companyDetails);

    //send mail to super admin
    sendEmail(
      ["rasmus@cannabis-connecter.com"],
      {
        subject: `A ${companyDetails.license_type} has onboarded`,
        data: companyDetails,
      },
      "company_onboard_admin_ack"
    );

    //send mail to customer
    sendEmail(
      companyDetails.contact_email,
      {
        subject: `Congratulations! We have received your request`,
        data: companyDetails,
      },
      "company_onboard_customer_ack"
    );

    return _company;
  };

  public update = async (
    companyDetails: ICompanies,
    id: ObjectId
  ): Promise<ICompanies | any> => {
    const singleCompany = await this.Company.findById(id);
    if (singleCompany !== null) {
      const company = await this.Company.findByIdAndUpdate(
        id,
        { ...companyDetails },
        { new: true }
      );
      return company;
    } else {
      return { status: false, message: "No records found regarding this id" };
    }
  };

  public delete = async (id: ObjectId): Promise<ICompanies | any> => {
    const singleCompany = await this.Company.findById(id);
    if (singleCompany !== null) {
      const company = await this.Company.findByIdAndUpdate(
        id,
        {
          isDeleted: true,
        },
        { new: true }
      );
      return company;
    } else {
      return { status: false, message: "No records found regarding this id" };
    }
  };

  public findAll = async (limit: number, skip: number): Promise<any> => {
    const totalCompanies = await this.Company.find({
      isDeleted: false,
    }).countDocuments();

    const companies = await this.Company.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    return {
      companies,
      totalCompanies,
    };
  };

  public getCompany = async (id: ObjectId): Promise<ICompanies | any> => {
    const company = await this.Company.findOne({ _id: id });
    if (company) {
      return company;
    } else {
      return { status: false, message: "No records found regarding this id" };
    }
  };

  public filterCompanies = async (
    limit: number,
    skip: number,
    filterTerms: any
  ): Promise<any> => {
    const totalCompanies = await this.Company.find({
      isDeleted: false,
    }).countDocuments();

    const companies = await this.Company.aggregate([
      {
        $search: {
          autocomplete: {
            query: `${filterTerms}`,
            path: "business_name",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
    ])
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    return {
      companies,
      totalCompanies,
    };
  };

  public searchCompany = async (
    limit: number,
    skip: number,
    searchTerm: string
  ): Promise<any> => {
    const totalCompanies = await this.Company.find({
      $search: {
        index: "default",
        compound: {
          should: [
            {
              autocomplete: {
                query: `sdfsdf+sdfsdf@solarmora.com`,
                path: "business_name",
              },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
            {
              autocomplete: { query: `${searchTerm}`, path: "contact_email" },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
            {
              autocomplete: { query: `${searchTerm}`, path: "contact_number" },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
            {
              autocomplete: { query: `${searchTerm}`, path: "license_number" },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          ],
        },
      },
      isDeleted: false,
    }).countDocuments();

    const companies = await this.Company.find({
      $search: {
        index: "default",
        compound: {
          should: [
            {
              autocomplete: { query: `${searchTerm}`, path: "business_name" },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
            {
              autocomplete: { query: `${searchTerm}`, path: "contact_email" },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
            {
              autocomplete: { query: `${searchTerm}`, path: "contact_number" },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
            {
              autocomplete: { query: `${searchTerm}`, path: "license_number" },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          ],
        },
      },
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    return {
      companies,
      totalCompanies,
    };
  };
}

export default CompanyServices;
