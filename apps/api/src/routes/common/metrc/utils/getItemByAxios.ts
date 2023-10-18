import axios from "axios";
import { Item } from "../../../../interface/metrc.interface";

async function getItemByAxios(licenseKey: String): Promise<Item[]> {
  try {
    const response = await axios.get(
      `https://sandbox-api-ok.metrc.com/items/v1/active?licenseNumber=${licenseKey}`,
      {
        auth: {
          username: "LysQqCc-9Uz9ChRO6sPzrZsyswUEQPN5qSnPrfNC41n2Ozsv",
          password: "O6-GVAUBnJxzgQo7ptJeRgSJ26OHAClx4f5g6WAVLiGOKsnh",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw { status: 400 };
  }
}

export default getItemByAxios;
