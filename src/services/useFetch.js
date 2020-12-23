import { useState, useEffect } from "react";
import { API_HOST } from "../globalVars";

export function useFetch(url, requestedOptions = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(API_HOST + url, requestedOptions);
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

  return { data, error, loading };
}
