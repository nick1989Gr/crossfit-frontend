import { getWithAxios } from "./apiUtils";
import { API_HOST } from "../globalConsts";

export const getAthleteByEmail = (email, accessToken) => {
  const url = `${API_HOST}/api/v1/athletes/email?email=${email}`;
  return getWithAxios(url, accessToken);
};
