import axios from "axios";

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

export const postWithAxios = async (url, body, accessToken) => {
  return axios.post(url, body, {
    headers: getSecurityHeaders(accessToken),
  });
};

const getSecurityHeaders = (accessToken) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
};
