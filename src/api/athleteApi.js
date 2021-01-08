import {
  getOptionHeadersForGet,
  handleResponseAndStatusCode,
  handleError,
} from "./apiUtils";
import { API_HOST } from "../globalConsts";

export function getAthleteByEmail(email, accessToken) {
  const url = `${API_HOST}/api/v1/athletes/email?email=${email}`;
  const options = getOptionHeadersForGet(accessToken);
  return fetch(url, options)
    .then(handleResponseAndStatusCode)
    .catch(handleError);
}
