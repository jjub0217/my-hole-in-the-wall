import { useMemo } from "react";
import convertImagePath from "./convertImagePath";
import useFetch from "./useFetch";
const baseUrl = import.meta.env.VITE_BASEURL;

const useGetPlaces = () => {
  const url = `${baseUrl}/places`;
  const fetchOptions = useMemo(
    () => ({
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
    []
  );
  const { data, isLoading, error } = useFetch(url, fetchOptions);
  // const { data, isLoading, error } = useFetch(`${baseUrl}/wrong`, {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" },
  // });

  return {
    data: convertImagePath(data, baseUrl),
    isLoading,
    error,
  };
};

export default useGetPlaces;
