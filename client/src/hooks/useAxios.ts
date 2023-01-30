import { useState, useEffect, useCallback } from "react";

type Status = "Idle" | "Loading" | "Success" | "Error";
interface UseAxiosReturn<T> {
  axiosData: () => void;
  responseData: T | null;
  status: Status;
}

const useAxios = <T>(
  callback: () => Promise<T>,
  deps: any[] = [],
  skip = false
): UseAxiosReturn<T> => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("Idle");

  const axiosData = useCallback(async () => {
    setStatus("Loading");
    try {
      const data = await callback();
      setResponseData(data);
      setStatus("Success");
      return data;
    } catch (error) {
      setStatus("Error");
      throw error;
    }
  }, deps);

  useEffect(() => {
    if (skip) return;
    axiosData();
  }, deps);

  return { axiosData, responseData, status };
};

export default useAxios;
