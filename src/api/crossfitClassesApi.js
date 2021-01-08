import { handleResponse, handleError } from "./apiUtils";
import { API_HOST } from "../globalConsts";

export function getAnalyticalClassInfo(id, accessToken) {
  const url = `${API_HOST}/api/v1/classes/${id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options).then(handleResponse).catch(handleError);
}

export function registerAthleteToClass(athleteId, classId, accessToken) {
  const url = `${API_HOST}/api/v1/classes/registration/${athleteId}/${classId}`;
  console.log(" Registering athlete:" + athleteId + " to class:" + classId);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(url, options).then(handleResponse).catch(handleError);
}

export function unregisterAthleteToClass(athleteId, classId, accessToken) {
  const url = `${API_HOST}/api/v1/classes/registration/${athleteId}/${classId}`;
  console.log(" Unregistering athlete:" + athleteId + " to class:" + classId);
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({}),
  };
  return fetch(url, options).then(handleResponse).catch(handleError);
}

export function getCrossfitClassesInfo() {
  const url = `${API_HOST}/api/v1/classes/info`;
  return fetch(url).then(handleResponse).catch(handleError);
}
