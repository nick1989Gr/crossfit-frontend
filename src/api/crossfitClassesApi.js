import {
  handleResponse,
  handleError,
  getOptionHeadersForGet,
  getOptionHeadersForDelete,
} from "./apiUtils";
import { API_HOST } from "../globalConsts";

export function getAnalyticalClassInfo(id, accessToken) {
  const url = `${API_HOST}/api/v1/classes/${id}`;
  const options = getOptionHeadersForGet(accessToken);
  return fetch(url, options).then(handleResponse).catch(handleError);
}

export function registerAthleteToClass(athleteId, classId, accessToken) {
  const url = `${API_HOST}/api/v1/classes/registration/${athleteId}/${classId}`;
  const options = getOptionHeadersForGet(accessToken);
  return fetch(url, options).then(handleResponse).catch(handleError);
}

export function unregisterAthleteToClass(athleteId, classId, accessToken) {
  const url = `${API_HOST}/api/v1/classes/registration/${athleteId}/${classId}`;
  const options = getOptionHeadersForDelete(accessToken);
  return fetch(url, options).then(handleResponse).catch(handleError);
}

export function getCrossfitClassesInfo() {
  const url = `${API_HOST}/api/v1/classes/info`;
  return fetch(url).then(handleResponse).catch(handleError);
}
