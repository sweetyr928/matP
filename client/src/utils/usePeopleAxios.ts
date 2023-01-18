import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface MatPeopleData {
  nickname: string;
  email: string;
  birthday: string;
  profileImg: string;
  gender: string;
  memo: string;
  createdAt: string;
  modifiedAt: string;
  followers: string;
  followings: string;
  postlist: Array<Post>;
  picklist: Array<Pick>;
}
interface Post {
  postId: number;
  likes: number;
  commentcount: number;
  thumbnail_url: string;
}

interface Pick {
  groupId: number;
  name: string;
  color: string;
}
interface UseMatPeopleAxiosReturn {
  matPeopleData: MatPeopleData | null;
  loading: boolean;
  error: Error | null;
}

const usePeopleAxios = (url: string): UseMatPeopleAxiosReturn => {
  const [matPeopleData, setMatPeopleData] = useState<MatPeopleData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const axiosData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<MatPeopleData>(url);
      setMatPeopleData(response.data);
    } catch (error) {
      setError(Object.assign(new Error(), error));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  return { matPeopleData, loading, error };
};

export default usePeopleAxios;
