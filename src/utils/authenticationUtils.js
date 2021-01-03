import { AUDIENCE } from "../globalVars";

export async function getToken(getAccessTokenSilently) {
  try {
    const accessToken = await getAccessTokenSilently({
      audience: AUDIENCE,
    });
    return accessToken;
  } catch (e) {
    throw e;
  }
}
