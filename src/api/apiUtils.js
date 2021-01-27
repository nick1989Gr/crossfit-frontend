import { HTTPMethod } from "http-method-enum";
import axios from "axios";

export const handleResponse = async (response) => {
  if (response.ok) return response.json();
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
};

export const handleResponseAndStatusCode = async (response) => {
  if (response.ok) return response.json();
  throw new Error(response.status);
};

export const handleError = (error) => {
  throw error;
};

export const getOptionHeadersForGet = (accessToken) => {
  return {
    method: HTTPMethod.GET,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const getOptionHeadersForDelete = (accessToken) => {
  return {
    method: HTTPMethod.DELETE,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({}),
  };
};

export const getOptionHeadersForPost = (accessToken, body) => {
  return {
    method: HTTPMethod.POST,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  };
};

export const getWithAxios = async (url, accessToken) => {
  return axios.get(url, {
    headers: getSecurityHeaders(accessToken),
  });
};

export const deleteWithAxios = async (url, accessToken) => {
  return axios.delete(url, {
    headers: getSecurityHeaders(accessToken),
  });
};

export const postWithAxios = async (url, accessToken, body) => {
  return axios.post(url, {
    method: HTTPMethod.POST,
    headers: getSecurityHeaders(accessToken),
    body: JSON.stringify(body),
  });
};

const getSecurityHeaders = (accessToken) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
};
