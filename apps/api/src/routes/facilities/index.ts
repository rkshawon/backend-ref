import { Router } from "express";
import createFacilities from "./controllers/create-facilities";
import bulkAddFacilities from "./controllers/bulk-add-facilities";
import getFacilities from "./controllers/get-facilities";
import updateFacilities from "./controllers/update-facilities";
import deleteFacilities from "./controllers/delete-facilities";
import scrapingFacilities from "./controllers/scraping-facilities";
import { upload } from "../../middlewares/multer";
import getFacilitiesById from "./controllers/get-facilities-by-id";

class CompaniesRoute {
  public router = Router();

  constructor() {
    this.initRoute();
  }

  initRoute() {
    this.router.post("/", createFacilities);
    this.router.post("/bulk-add", upload.single("csvFile"), bulkAddFacilities);
    this.router.get("/", getFacilities);
    this.router.get("/:id", getFacilitiesById);
    this.router.put("/update/:id", updateFacilities);
    this.router.delete("/:id", deleteFacilities);
    this.router.put("/:license_number", scrapingFacilities);
  }
}

export default CompaniesRoute;
