import { HTTPMethod } from "http-method-enum";

export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}

export function getOptionHeadersForGet(accessToken) {
  return {
    method: HTTPMethod.GET,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
}

export function getOptionHeadersForDelete(accessToken) {
  return {
    method: HTTPMethod.DELETE,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({}),
  };
}

export function getOptionHeadersForPost(accessToken, body) {
  return {
    method: HTTPMethod.POST,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  };
}
