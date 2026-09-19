import { useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';

const useAxios = (): AxiosInstance => {
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'https://naturals-server.vercel.app/',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, []);

  return axiosInstance;
};

export default useAxios;
