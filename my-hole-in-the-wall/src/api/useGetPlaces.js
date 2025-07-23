import convertImagePath from "./convertImagePath";
import useFetch from "./useFetch";

// 이건 무엇을 하는 함수인가?
// 실패하면 실패하는거에 대한 데이터, 에러 처리 등등 데이터들이 ui 적으로 별로
// 한번 가공하기 위한 함수
// 어떤 에러다. 404 등등....
// 500 => 처리과정의 에러 => 다시 시도 가능
// 400 => 데이터 요청하는데에서 프론트에서 문제 (쿼리나, 파람 사용안함)
// 포스트일때는 오류처리 할수 있음
// 이 정보에 문제가 잇으니 유저에게 알리는 중간 처리하는 함수
// 의존성... 분리
// 관심사 분리... (관심사가 합쳐지면 안됨)
// 서버 요청을 통해서 받아온 내용의 데이터 처리 부분의 역할
const useGetPlaces = () => {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const { data, isLoading, error } = useFetch(`${baseUrl}/places`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  // 얘는 왜 또 따로 떼려고 하는 것인가? foodsDTOTransform
  // 전송객체를 한번 바꾼다.
  // const places = data?.places?.map((place) => ({
  //   ...place,
  //   image: {
  //     ...place.image,
  //     src: `${baseUrl}/${place.image?.src || "default.png"}`,
  //   },
  // }));

  // 400, 401, 431...
  console.log(error);

  return {
    data: convertImagePath(data, baseUrl),
    isLoading,
    error,
  };
};

export default useGetPlaces;
