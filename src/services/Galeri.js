import API_ENDPOINT from "@/globals/api-endpoints";
import axios from "axios";

export async function postGallery(token, formData) {
  try {
    const response = await axios.post(API_ENDPOINT.POST_GALERI, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}

export async function getGallery(token) {
  try {
    const response = await axios.get(API_ENDPOINT.GET_GALERI, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}

export async function deleteGallery(token, id) {
  try {
    const response = await axios.delete(`${API_ENDPOINT.DELETE_GALERI(id)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}
