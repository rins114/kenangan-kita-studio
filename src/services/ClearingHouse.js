import API_ENDPOINT from "@/globals/api-endpoints";
import axios from "axios";

export async function postClearingHouseRequest(data, token) {
  try {
    console.log("Data yang dikirim:", data);
    const response = await axios.post(API_ENDPOINT.POST_CLEARING_HOUSE, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}

export async function getClearingsHouseRequest(token) {
  try {
    const response = await axios.get(API_ENDPOINT.GET_CLEARING_HOUSE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}
