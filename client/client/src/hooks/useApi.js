import { useState, useCallback } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.request(config);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  return { request, loading, error, api };
}