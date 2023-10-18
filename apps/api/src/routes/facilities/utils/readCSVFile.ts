import fs from "fs";
import csvParser from "csv-parser";

const tranform = (result: any) => {
  const transformedData: any = result.map((row: any) => ({
    business_name: row["Business Name"],
    license_type: row["License Type"]?.toLowerCase(),
    license_number: row["License No."],
    country: row["Country"],
    county: row["County"],
    state: row["State"],
    city: row["City"],
    dba: row["DBA"],
  }));

  transformedData.forEach((data: any) => {
    data.address = {
      state: "",
      street: "",
      zip: "",
      coordinates: [],
    };
  });
  return transformedData;
};

export async function readCSVFile(filePath: any): Promise<any[]> {
  return new Promise((resolve, reject) => {
    let results: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        results = tranform(results);
        resolve(results);
      })
      .on("error", (error) => reject(error));
  });
}
