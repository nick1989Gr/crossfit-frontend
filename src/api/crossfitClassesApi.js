import { getWithAxios, deleteWithAxios } from "./apiUtils";
import { API_HOST } from "../globalConsts";

export const getAnalyticalClassInfo = async (id, accessToken) => {
  const url = `${API_HOST}/api/v1/classes/${id}`;
  return getWithAxios(url, accessToken);
};

export const registerAthleteToClass = (athleteId, classId, accessToken) => {
  const url = `${API_HOST}/api/v1/classes/registration/${athleteId}/${classId}`;
  return getWithAxios(url, accessToken);
};

export const unregisterAthleteToClass = (athleteId, classId, accessToken) => {
  const url = `${API_HOST}/api/v1/classes/registration/${athleteId}/${classId}`;
  return deleteWithAxios(url, accessToken);
};
