import updateCompanyService from "./update.service";
import deletCompanyService from "./delete.service";
import findAllCompaniesService from "./find-all.service";
import filterCompaniesService from "./filter.services";
import getCompanyService from "./get-company.services";
import searchCompaniesService from "./search.services";
import verifyCompanyService from "./verify.service";

class CompanyServices {
  public update = updateCompanyService;
  public delete = deletCompanyService;
  public findAll = findAllCompaniesService;
  public get = getCompanyService;
  public filter = filterCompaniesService;

  public searchCompany = searchCompaniesService;
  public verify = verifyCompanyService;
}

export default CompanyServices;
