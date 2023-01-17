import { useState, useEffect, useCallback } from "react";
import axios from "axios";
const url = "http://localhost:3001/groups";

interface pickersData {
  id: number;
  name: string;
  color: string;
}

interface UsePickersAxiosReturn {
  pickersData: pickersData[] | null;
  loading: boolean;
  error: Error | null;
}

export const getMatPickers = (): UsePickersAxiosReturn => {
  const [pickersData, setPickersData] = useState<pickersData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const axiosData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<pickersData[]>(url);
      setPickersData(response.data);
    } catch (error) {
      setError(Object.assign(new Error(), error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  return { pickersData, loading, error };
};

interface PickPlaces {
  id: number;
  name: string;
  address: string;
  star: number;
}

interface Pickers {
  id: number;
  name: string;
  color: string;
  pickPlaces: Array<PickPlaces>;
}

interface UsePickersDetailReturn {
  pickersTitle: string;
  pickPlaces: PickPlaces[] | null;
  loading: boolean;
  error: Error | null;
}

export const getMatPickersDetail = (
  id: string | undefined
): UsePickersDetailReturn => {
  const [pickersTitle, setPickersTitle] = useState("");
  const [pickPlaces, setPickPlace] = useState<PickPlaces[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const axiosData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<Pickers>(`${url}/${id}`);
      setPickersTitle(response.data.name);
      setPickPlace(response.data.pickPlaces);
    } catch (error) {
      setError(Object.assign(new Error(), error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  return { pickersTitle, pickPlaces, loading, error };
};

export const addMatPickers = async (name: string, color: string) => {
  try {
    await axios.post(url, {
      name,
      color,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const deleteMatPickers = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const updateMatPickers = async (
  id: number,
  name: string,
  color: string
) => {
  try {
    await axios.patch(`${url}/${id}`, {
      name,
      color,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
