/* eslint-disable */

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface postsData {
  postId: number;
  likes: number;
  commentcount: number;
  thumbnail_url: string;
}

interface UsePostsAxiosReturn {
  postsData: postsData[] | null;
  loading: boolean;
  error: Error | null;
}

const UsePostsAxios = (url: string): UsePostsAxiosReturn => {
  const [postsData, setPostsData] = useState<postsData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const axiosData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<postsData[]>(url);
      setPostsData(response.data);
    } catch (error) {
      setError(Object.assign(new Error(), error));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  return { postsData, loading, error };
};

export default UsePostsAxios;
