import API_ENDPOINT from "@/globals/api-endpoints";
import axios from "axios";

export async function getUserRoles() {
  try {
    const response = await axios.get(API_ENDPOINT.GET_USER_ROLES);
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}
