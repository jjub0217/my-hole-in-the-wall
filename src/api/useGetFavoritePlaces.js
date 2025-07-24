import { useMemo } from "react";
import useFetch from "./useFetch";
const baseUrl = import.meta.env.VITE_BASEURL;

const useGetFavoritePlaces = () => {
  const url = `${baseUrl}/users/places`;
  const fetchOptions = useMemo(
    () => ({
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
    []
  );

  const {
    data: favoriteRestaurants,
    isLoading,
    error,
    refetch: refetchFavoritePlaces,
  } = useFetch(url, fetchOptions);

  // const { data, isLoading, error } = useFetch(`${baseUrl}/wrong`, {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" },
  // });

  return {
    favoriteRestaurants,
    isLoading,
    error,
    refetchFavoritePlaces,
  };
};

export default useGetFavoritePlaces;
