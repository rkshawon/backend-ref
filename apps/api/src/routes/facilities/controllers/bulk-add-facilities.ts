import { NextFunction, Request, Response } from "express";
import Facilities from "../../../models/facilities.model";
import { readCSVFile } from "../utils/readCSVFile";
import fs from "fs"; // Import the 'fs' module
import path from "path"; // Import the 'path' module

const bulkAddFacilities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const csvFile = req.file;
    const csvFilePath = path.resolve(csvFile.path);

    const csvData = await readCSVFile(csvFilePath);

    const createdFacilities = await Facilities.insertMany(csvData);

    fs.unlinkSync(csvFilePath);

    res.send({
      status: true,
      message: "Facilities are added successfully",
      data: createdFacilities,
    });
  } catch (err) {
    next(err);
  }
};

export default bulkAddFacilities;
