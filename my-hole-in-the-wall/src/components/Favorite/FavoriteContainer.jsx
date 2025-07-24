// import useDeleteFavoritePlace from "../../api/useDeleteFavoritePlace";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import useDeleteFavoritePlace from "../../api/useDeleteFavoritePlace";

export const FavoriteContainer = ({
  favoriteRestaurants,
  refetchFavoritePlaces,
}) => {
  const { deleteFavorite } = useDeleteFavoritePlace();
  const handleDelete = async (el) => {
    try {
      await deleteFavorite(el.id);
      const result = await refetchFavoritePlaces();
      console.log("🔁 refetch 결과:", result);
    } catch (err) {
      console.error("삭제 중 에러:", err);
    }
  };
  useEffect(
    () => console.log("favoriteRestaurants:", favoriteRestaurants),
    [favoriteRestaurants]
  );

  return (
    <section className="flex flex-col items-center px-4 py-8">
      <h2 className="text-3xl font-handwriting mb-8 text-[#d97706]">
        🎀 찜한 맛집 목록
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {favoriteRestaurants?.places.map((item) => {
          const el = item.place ?? item;
          return (
            <li
              key={el.id}
              className="relative bg-white/80 backdrop-blur rounded-2xl shadow-xl p-0 flex flex-col overflow-hidden transition-transform duration-200 hover:scale-[1.025]"
            >
              {/* 이미지 영역 */}
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={el.image.src}
                  alt={el.image.alt}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                {/* 하트(찜하기) 버튼 - 카드형에 맞게 개선 */}
                <button
                  className="absolute top-3 right-3 bg-[#fff]/60 rounded-full shadow-lg p-2 flex items-center justify-center transition-all duration-150  hover:bg-[#000]/60 group"
                  aria-label="삭제"
                  type="button"
                  onClick={() => handleDelete(el)}
                  style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.15)" }}
                >
                  <FaRegTrashAlt
                    size={20}
                    className="text-black transition-colors duration-150 group-hover:text-[#fff]"
                  />
                </button>
              </div>
              {/* 텍스트 영역 */}
              <div className="flex flex-col flex-1 px-5 py-4">
                <h3 className="font-bold text-xl mb-2 font-handwriting text-[#d97706] truncate">
                  {el.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {el.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
