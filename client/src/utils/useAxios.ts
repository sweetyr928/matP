/* eslint-disable */
import { useState, useEffect, useCallback } from "react";
import axios, { AxiosResponse } from "axios";

interface MemberData {
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
interface UseAxiosReturn {
  memberData: MemberData | null;
  loading: boolean;
  error: Error | null;
}

const useAxios = (url: string): UseAxiosReturn => {
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const axiosData = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<MemberData> = await axios.get(url);
      setMemberData(response.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  return { memberData, loading, error };
};

export default useAxios;
