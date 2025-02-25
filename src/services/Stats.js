import API_ENDPOINT from "@/globals/api-endpoints";
import axios from "axios";

export async function getClearingHouseStatusStats(token) {
  try {
    const response = await axios.get(API_ENDPOINT.GET_STATS_CH_STATUS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}
