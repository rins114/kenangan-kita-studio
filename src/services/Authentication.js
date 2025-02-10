import API_ENDPOINT from "@/globals/api-endpoints";
import axios from "axios";

export async function register(formData) {
  try {
    const response = await axios.post(API_ENDPOINT.REGISTER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}

export async function login(email, password) {
  try {
    const response = await axios.post(API_ENDPOINT.LOGIN, {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}

export async function session(token) {
  try {
    const response = await axios.get(API_ENDPOINT.SESSION, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return { status: error.status, error: error.message };
  }
}

export async function logout(token) {
  try {
    const response = await axios.post(
      API_ENDPOINT.LOGOUT,
      {},
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
