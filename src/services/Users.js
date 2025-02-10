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
