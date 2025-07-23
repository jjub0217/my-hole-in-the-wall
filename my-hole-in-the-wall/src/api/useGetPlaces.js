import convertImagePath from "./convertImagePath";
import useFetch from "./useFetch";

const useGetPlaces = () => {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const { data, isLoading, error } = useFetch(`${baseUrl}/places`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return {
    data: convertImagePath(data, baseUrl),
    isLoading,
    error,
  };
};

export default useGetPlaces;
