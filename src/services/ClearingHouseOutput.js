import API_ENDPOINT from "@/globals/api-endpoints";
import axios from "axios";

export async function postClearingHouseRequestOutput(token, formData) {
  try {
    const response = await axios.post(
      API_ENDPOINT.POST_CLEARING_HOUSE_OUTPUT,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, message: error.message };
  }
}
