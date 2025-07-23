import { sortPlacesByDistance } from "../../api/loc";
import { useCurrentLocation } from "../../api/useCurrentLocation";
import useGetPlaces from "../../api/useGetPlaces";
import { ErrorSection } from "../Error";
import { LoadingSection } from "../Loading";

// ui 를 보여주는것과 데이터 정리 역할을 다 하고 잇는중
// 데이터의 형식과 우리가 쓰려는 형식이 같다는 보장이 없다.
// 그렇기때문에 가공이 필요하다.
// 컴포넌트에서 해도 되지 않나?
// ==> 가공 데이터가 망가지면 ui 가 망가질수도 있다.
export const RestaurantsContainer = () => {
  const { data: restaurants, isLoading, error } = useGetPlaces();

  const {
    latitude: currentLatitude,
    longitude: currentLongitude,
    error: locationError,
  } = useCurrentLocation();

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
              className="relative bg-[#fffbe7] rounded-2xl shadow-lg p-6 border-2  border-[#fbbf24]"
            >
              <img
                src={el.image.src}
                alt={el.image.alt}
                className="w-full h-40 object-cover rounded-xl mb-4 shadow"
              />
              <h3 className="font-bold text-lg mb-1 font-handwriting text-[#d97706]">
                {el.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{el.description}</p>
            </li>
          ))}
      </ul>
    </section>
  );
};
