import { useCallback, useEffect, useState } from "react";
import axios from "axios";

// ----------- Created reusable custom hook to fetch data
const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const onFetch = useCallback(() => {
    axios
      .get(url)
      .then((res) => {
        if (res.status !== 200) throw new Error("Response failed");
        return res.data;
      })
      .then((data) => {
        if (url === "https://opentdb.com/api_category.php") {
          setResponse(data.trivia_categories);
          setLoading(false);
        } else {
          setResponse(data.results);
          setLoading(false);
        }
      })
      .then((data) => data && setLoading(false))
      .catch((err) => setError(err));

    return () => {
      setResponse(null);
      setError(null);
    };
  }, [url]);

  useEffect(() => {
    onFetch();
  }, [onFetch]);

  return { response, error, loading, resendRequest: onFetch };
};

export default useFetch;
