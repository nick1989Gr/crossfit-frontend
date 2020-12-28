import { handleResponse, handleError } from "./apiUtils";
import { API_HOST } from "../globalVars";


export function getSchedule(start, end) {
    const url = `${API_HOST}/api/v1/classes/schedule`;
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start,
          end,
        }),
      };
    return fetch(url, options).then(handleResponse).catch(handleError);
}