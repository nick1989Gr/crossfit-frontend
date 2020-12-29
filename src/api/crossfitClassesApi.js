import { handleResponse, handleError } from "./apiUtils";
import { API_HOST } from "../globalVars";

export function getClassInfo(id) {
  const url = `${API_HOST}/api/v1/classes/${id}`;
  return fetch(url).then(handleResponse).catch(handleError);
}

export function registerAthleteToClass(athleteId, classId) {
  const url = `${API_HOST}/api/v1/classes/registration/${athleteId}/${classId}`;
  console.log(" Registering athlete:" + athleteId + " to class:" + classId);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  };
  return fetch(url, options).then(handleResponse).catch(handleError);
}

export function unregisterAthleteToClass(athleteId, classId) {
  const url = `${API_HOST}/api/v1/classes/registration/${athleteId}/${classId}`;
  console.log(" Unregistering athlete:" + athleteId + " to class:" + classId);
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  };
  return fetch(url, options).then(handleResponse).catch(handleError);
}
