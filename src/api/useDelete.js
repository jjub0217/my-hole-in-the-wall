import { useState } from "react";

const useDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const deleteData = async (url, options) => {
    setIsLoading(true);
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error("찜한 장소 삭제 실패");
      }
      console.log(res);
    } catch (err) {
      console.error("삭제 에러:", err);
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  return { deleteData, isLoading, error };
};

export default useDelete;
