import axios from "axios";
import { useState, useEffect } from "react";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(url);
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await API.get(url);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return { data, loading, error, reFetch };
};

export default useFetch;
