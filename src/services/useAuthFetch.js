import { useState, useEffect } from "react";
import { API_HOST, AUDIENCE } from "../globalVars";
import { useAuth0 } from "@auth0/auth0-react";

export function useAuthFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function getData() {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: AUDIENCE,
        });

        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await fetch(API_HOST + url, options);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    getData();
    // eslint-disable-next-line
  }, [url]);

  return { data, error, loading, isAuthenticated };
}
