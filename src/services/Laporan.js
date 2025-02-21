import API_ENDPOINT from "@/globals/api-endpoints";
import axios from "axios";

export async function postLaporan(token, formData) {
  try {
    const response = await axios.post(API_ENDPOINT.POST_LAPORAN_CH, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}

export async function getLaporanByClearingHouseId(token, id) {
  try {
    const response = await axios.get(API_ENDPOINT.GET_LAPORAN_BY_CH_ID(id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}

export async function getLaporan(token) {
  try {
    const response = await axios.get(API_ENDPOINT.GET_ALL_LAPORAN_CH, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}
