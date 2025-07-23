import { useCallback, useEffect, useState } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  // 상태로 관리하는 이유는 단순히 값을 저장하기 위해서가 아니라 컴포넌트 리랜더링과 연관되어있다.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // let isLoading = true;
  // const setIsLoading = (newValue) => {
  //   isLoading = newValue;
  // };

  const getData = useCallback(async () => {
    console.log("✅ getData 실행됨:", url);
    try {
      const res = await fetch(url, options);
      console.log("🔁 응답 받음:", res);
      console.log(res.ok);

      // 네트워크 오류가 아닌 이상 다른 에러들은 모두 try 문으로 넘어온다.
      // 정상 응답으로 간주하기 때문이다.

      /**
       * 404 에러를 재현하기 위해 했던 과정
       *
       * env 의 포트 주소를 다른 주소로 수정
       * json server 실행
       * 더미데이터 생성
       */

      // 404, 500 에러일 경우에 여기에서 컨트롤이 가능하다.
      // 404 : 잘못된 주소를 입력했을 때 / 존재하지 않는 파일이나 페이지를 요청했을 때
      // 500 : 서버 내부 로직에서 예기치 않은 에러가 발생했을 때(서버 내부 오류)

      if (!res.ok) {
        const customError = new Error("데이터를 가져오는 데 실패했습니다.");
        customError.status = res.status;
        customError.message = "요청하신 데이터를 찾을 수 없습니다.";
        throw customError;
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      // 여기로 넘어오는 것은 네트워크 오류(인터넷 끊김, cors 에러 등)
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
    console.log(isLoading);

    if (url) getData();
  }, [url, getData]);
  return { isLoading, data, error };
};
export default useFetch;
