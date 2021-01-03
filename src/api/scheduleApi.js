import { handleResponse, handleError } from "./apiUtils";
import { API_HOST } from "../globalVars";

export function getScheduleForAthlete(start, end, athleteId, accessToken) {
  const url = `${API_HOST}/api/v1/classes/schedule/${athleteId}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      start,
      end,
    }),
  };
  return fetch(url, options).then(handleResponse).catch(handleError);
}
