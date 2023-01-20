import { useState, useEffect, useCallback } from "react";

interface ReponseData {
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
type Status = "Idle" | "Loading" | "Success" | "Error";
interface UseAxiosReturn {
  reponseData: ReponseData | null;
  status: Status;
}

const useAxios = (callback: any, deps = [], skip = false): UseAxiosReturn => {
  const [reponseData, setReponseData] = useState<ReponseData | null>(null);
  const [status, setStatus] = useState<Status>("Idle");

  const axiosData = useCallback(async () => {
    setStatus("Loading");
    try {
      const data = await callback();
      setReponseData(data);
      setStatus("Success");
    } catch (error) {
      setStatus("Error");
      throw error;
    }
  }, deps);

  useEffect(() => {
    if (skip) return;
    axiosData();
  }, deps);

  return { reponseData, status };
};

export default useAxios;
