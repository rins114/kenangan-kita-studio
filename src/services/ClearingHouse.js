import API_ENDPOINT from "@/globals/api-endpoints";
import paginate from "@/utils/PaginationHelper";
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

export async function getClearingsHouseRequest(token, filterBody) {
  try {
    const filteredBody = Object.fromEntries(
      Object.entries(filterBody).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );
    const response = await axios.post(
      API_ENDPOINT.GET_CLEARING_HOUSE,
      filteredBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}

export async function verifyClearingsHouseRequest(token, id) {
  try {
    const response = await axios.put(
      API_ENDPOINT.VERIFY_CLEARING_HOUSE(id),
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}

export async function rejectClearingsHouseRequest(token, id, keterangan) {
  try {
    const response = await axios.put(
      API_ENDPOINT.REJECT_CLEARING_HOUSE(id),
      { alasan: keterangan },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}
