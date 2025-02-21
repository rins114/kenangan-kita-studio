import API_ENDPOINT from "@/globals/api-endpoints";
import axios from "axios";

export async function getUsers(token) {
  try {
    const response = await axios.get(API_ENDPOINT.GET_USERS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}

export async function verifyUser(token, id) {
  try {
    const response = await axios.post(
      API_ENDPOINT.VERIFY_USER(id),
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

export async function rejectUser(token, id, keterangan) {
  try {
    const response = await axios.post(
      API_ENDPOINT.REJECT_USER(id),
      { keterangan },
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

export async function updateUserProfile(token, formData) {
  try {
    const response = await axios.put(
      API_ENDPOINT.UPDATE_USER_PROFILE,
      formData,
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
