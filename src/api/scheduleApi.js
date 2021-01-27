import { postWithAxios } from "./apiUtils";
import { API_HOST } from "../globalConsts";

export const getScheduleForAthlete = (start, end, athleteId, accessToken) => {
  const url = `${API_HOST}/api/v1/classes/schedule/${athleteId}`;
  const body = {
    start,
    end,
  };
  return postWithAxios(url, body, accessToken);
};
