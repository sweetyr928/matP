import { useState, useEffect, useCallback } from "react";
import axios from "axios";
const url = "http://localhost:3001/places";

interface PlacePosts {
  postId: number;
  likes: number;
  commentcount: number;
  thumbnail_url: string;
}

interface Place {
  placeId: number;
  name: string;
  placeImg: string;
  number: string;
  address: string;
  memo: string;
  latitude: string;
  longitude: string;
  starAvg: number;
  isPicked: boolean;
  pickCount: number;
  postCount: number;
  posts: Array<PlacePosts>;
}

interface UsePlaceDetailReturn {
  place: Place | null;
  placePosts: PlacePosts[];
  loading: boolean;
  error: Error | null;
}

export const getMatPlacesDetail = (): UsePlaceDetailReturn => {
  const [place, setPlace] = useState<Place | null>(null);
  const [placePosts, setPlacePosts] = useState<PlacePosts[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const axiosData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<Place>(`${url}`);
      setPlace(response.data);
      setPlacePosts(response.data.posts);
    } catch (error) {
      setError(Object.assign(new Error(), error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  return { place, placePosts, loading, error };
};
