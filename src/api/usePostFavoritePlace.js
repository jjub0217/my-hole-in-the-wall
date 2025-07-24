// src/api/usePostFavoritePlace.js
import usePost from "./usePost";

const usePostFavoritePlace = () => {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const { postData, isLoading, error } = usePost(`${baseUrl}/users/places`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return { postData, isLoading, error };
};

export default usePostFavoritePlace;
