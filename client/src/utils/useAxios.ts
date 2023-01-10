import { useState, useEffect } from "react";
import axios from "axios";

function useAxios() {
  // null설정한 이유: 모든 data가 같진 않기 때문
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const axiosData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(``);
        setQuestionData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    axiosData();
  }, [url]);

  return { questionData, loading, error };
}

export default useAxios;
