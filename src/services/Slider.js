import API_ENDPOINT from "@/globals/api-endpoints";
import axios from "axios";

export async function postSlider(token, formData) {
  try {
    const response = await axios.post(API_ENDPOINT.POST_SLIDER, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}
export async function getSlider(token) {
  try {
    const response = await axios.get(API_ENDPOINT.GET_SLIDER, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}
export async function deleteSlider(token, id) {
  try {
    const response = await axios.delete(API_ENDPOINT.DELETE_SLIDER(id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}
export async function toggleSliderStatus(token, id) {
  try {
    const response = await axios.put(
      API_ENDPOINT.TOOGLE_SLIDER_UPLOAD_STATUS(id),
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}
