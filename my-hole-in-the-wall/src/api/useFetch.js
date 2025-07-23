import { useCallback, useEffect, useState } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    setIsLoading(true);
    console.log("✅ getData 실행됨:", url);
    try {
      const res = await fetch(url, options);
      console.log("🔁 응답 받음:", res);
      if (!res.ok) {
        const customError = new Error("데이터를 가져오는 데 실패했습니다.");
        customError.status = res.status;
        customError.message =
          res.status === 404
            ? "요청하신 데이터를 찾을 수 없습니다."
            : "서버 요청에 실패했습니다.";
        throw customError;
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("❌ catch 안에서 잡은 에러:", err);
      setError({
        status: err.status ?? "NETWORK_ERROR",
        message: err.message || "서버에 연결할 수 없습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    console.log("🚀 useEffect 실행됨:", url);
    if (url) getData();
  }, [url, getData]);
  return { isLoading, data, error };
};
export default useFetch;
