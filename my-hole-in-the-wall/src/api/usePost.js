import { useState } from "react";

const usePost = (url, options) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (payload) => {
    setIsLoading(true);
    try {
      const fetchOptions = { ...options };
      if (payload !== undefined) {
        // payload를 JSON 문자열로 변환하여 요청 본문(body)에 포함
        fetchOptions.body = JSON.stringify({ place: payload });
      }
      const res = await fetch(url, fetchOptions);

      if (!res.ok) {
        throw new Error("찜한 장소 등록 실패");
      }

      const data = await res.json();
      console.log(data); // {message: 'User place added/updated!'}
      return data;
    } catch (err) {
      console.error("찜하기 에러:", err);
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  return { postData, isLoading, error };
};

export default usePost;
