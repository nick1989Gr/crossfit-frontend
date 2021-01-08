import { AUTH0_AUDIENCE } from "../globalConsts";

export async function getToken(getAccessTokenSilently) {
  try {
    const accessToken = await getAccessTokenSilently({
      audience: AUTH0_AUDIENCE,
    });
    return accessToken;
  } catch (e) {
    throw e;
  }
}
