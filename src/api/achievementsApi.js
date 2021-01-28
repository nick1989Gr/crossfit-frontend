import { getWithAxios } from "./apiUtils";
import { API_HOST } from "../globalConsts";

export const getTopAchievementsForExercise = (exerciseId, accessToken) => {
  const url = `${API_HOST}/api/v1/achievements/top/${exerciseId}`;
  return getWithAxios(url, accessToken);
};

export const getAchievementsLogForAthlete = (athleteId, accessToken) => {
  const url = `${API_HOST}/api/v1/achievements/athlete/${athleteId}`;
  return getWithAxios(url, accessToken);
};
