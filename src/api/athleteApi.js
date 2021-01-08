import { handleResponse, handleError } from "./apiUtils";
import { API_HOST } from "../globalConsts";

export function getAthleteByEmail(email, accessToken) {
  const url = `${API_HOST}/api/v1/athletes/email?email=${email}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options).then(handleResponse).catch(handleError);
}
