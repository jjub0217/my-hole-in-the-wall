import { sortPlacesByDistance } from "../../api/loc";
import { useCurrentLocation } from "../../api/useCurrentLocation";
import useGetPlaces from "../../api/useGetPlaces";
import usePostFavoritePlace from "../../api/usePostFavoritePlace";
import { ErrorSection } from "../Error";
import { LoadingSection } from "../Loading";

export const RestaurantsContainer = ({
  favoriteRestaurants,
  refetchFavoritePlaces,
}) => {
  const { data: restaurants, isLoading, error } = useGetPlaces();
  const { postData } = usePostFavoritePlace();
  const {
    latitude: currentLatitude,
    longitude: currentLongitude,
    error: locationError,
  } = useCurrentLocation();

  const handlePost = async (el) => {
    const isAlreadyFavorite = favoriteRestaurants?.places.some(
      (item) => (item.place ?? item).id === el.id
    );

    if (isAlreadyFavorite) {
      alert("이미 찜한 맛집입니다!");
      return;
    }
    try {
      await postData(el); // POST 요청
      await refetchFavoritePlaces(); // 찜한 맛집 목록 다시 불러오기
    } catch (err) {
      console.error("에러 발생:", err);
    }
  };

  if (error) {
    return (
      <ErrorSection
        title="앗! 맛집 정보를 불러오지 못했어요"
        message={error.message}
        statusCode={error.status}
      />
    );
  }

  if (!currentLatitude || !currentLongitude) {
    return <ErrorSection message={locationError} />;
  }

  if (isLoading) {
    return (
      <LoadingSection
        title="맛집을 탐색 중입니다..."
        message="잠시만 기다려주세요!"
      />
    );
  }

  return (
    <section className="flex flex-col items-center px-4 py-8">
      <h2 className="text-3xl font-handwriting mb-8 text-[#d97706]">
        🍽️ 맛집 전체 목록
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {restaurants?.places &&
          currentLatitude &&
          currentLongitude &&
          sortPlacesByDistance(
            restaurants.places,
            currentLatitude,
            currentLongitude
          ).map((el) => (
            <li
              key={el.id}
              className="relative bg-white/80 backdrop-blur  rounded-2xl shadow-xl p-0 flex flex-col overflow-hidden transition-transform duration-200 hover:scale-[1.025]"
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
                  className="absolute top-3 right-3 bg-[#fff]/60 rounded-full shadow-lg p-2 flex items-center justify-center transition-all duration-150 hover:bg-[#fb2c36]/50 group"
                  type="button"
                  onClick={() => handlePost(el)}
                  style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.15)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="#fb2c36"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    className="transition-colors duration-150 group-hover:stroke-[#fff]"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {/* )} */}
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
          ))}
      </ul>
    </section>
  );
};
