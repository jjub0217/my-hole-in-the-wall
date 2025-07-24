// src/api/usePostFavoritePlace.js

import useDelete from "./useDelete";

const useDeleteFavoritePlace = () => {
  const baseUrl = import.meta.env.VITE_BASEURL;

  const { deleteData, isLoading, error } = useDelete();

  // id는 이벤트 핸들러(예: 버튼 클릭)에서 전달되는 값입니다.
  // 하지만 React Hook은 렌더링 시점에 동기적으로 호출되어야 합니다.
  // 그런데 위처럼 하면 id가 아직 존재하지 않을 수도 있고, 매번 바뀔 수도 있기 때문에,
  // → React는 이 Hook이 언제 어떻게 바뀌는지 예측할 수 없고,
  // → 따라서 렌더링 순서가 꼬이거나 상태가 꼬일 위험이 있습니다.
  // useDelete(...)는 React Hook이기 때문에 컴포넌트나 다른 Hook의 최상단에서만 호출해야 합니다.
  const deleteFavorite = async (id) => {
    return await deleteData(`${baseUrl}/users/places/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };
  return { deleteFavorite, isLoading, error };
};

export default useDeleteFavoritePlace;
