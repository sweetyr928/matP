import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface commentsData {
  id: number;
  nickname: string;
  profileimg: string;
  comment: string;
  createdat: string;
}

interface getCommentReturn {
  commentsData: commentsData[] | null;
  loading: boolean;
  error: Error | null;
}

export const getComment = (url: string): getCommentReturn => {
  const [commentsData, setCommentsData] = useState<commentsData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const axiosData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<commentsData[]>(url);
      setCommentsData(response.data);
    } catch (error) {
      setError(Object.assign(new Error(), error));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  return { commentsData, loading, error };
};

export default getComment;
