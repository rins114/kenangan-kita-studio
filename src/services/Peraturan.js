import API_ENDPOINT from "@/globals/api-endpoints";
import axios from "axios";

export async function postPeraturan(token, formData) {
  try {
    const response = await axios.post(API_ENDPOINT.POST_PERATURAN, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, message: error.message };
  }
}

export async function getPeraturan(params) {
  try {
    const response = await axios.get(API_ENDPOINT.GET_PERATURAN(params));
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, message: error.message };
  }
}

export async function deletePeraturan(token, id) {
  try {
    const response = await axios.delete(API_ENDPOINT.DELETE_PERATURAN(id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, message: error.message };
  }
}
