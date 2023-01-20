import { useState, useEffect, useCallback } from "react";
import axios from "axios";

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
interface Status {
  status: "Idle" | "Loading" | "Success" | "Error";
}
interface UseAxiosReturn {
  memberData: MemberData | null;
  status: Status;
}

const useAxios = (url: string): UseAxiosReturn => {
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [status, setStatus] = useState<Status>("Idle");

  const axiosData = useCallback(async () => {
    setStatus("Loading");
    try {
      const response = await axios.get<MemberData>(url);
      setMemberData(response.data);
      setStatus("Success");
    } catch (error) {
      setStatus("Error");
      throw error;
    }
  }, [url]);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  return { memberData, status };
};

export default useAxios;
