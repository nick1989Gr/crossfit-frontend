import { handleResponse, handleError } from "./apiUtils";
import { API_HOST } from "../globalVars";

export function getClassInfo(id) {
  const url = `${API_HOST}/api/v1/classes/${id}`;
  return fetch(url).then(handleResponse).catch(handleError);
}
