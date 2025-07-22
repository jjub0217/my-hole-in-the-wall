import { BASEURL } from "../../api/baseUrl/baseUrl";
import useFetch from "../../api/useFetch";

export const RestaurantsContainer = () => {
  const { data: restaurants } = useFetch(`${BASEURL}/places`);
  console.log(restaurants);

  if (!restaurants) {
    return <section>리스트를 불러오는 중입니다</section>;
  }

  return (
    <section className="flex flex-col px-[3rem] py-[2rem] border">
      <h2>맛집 목록</h2>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {restaurants.places.map((el) => (
            <li
              key={el.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <div className="aspect-[3/2] bg-gray-100">
                <img
                  src={`${BASEURL}/${el.image.src}`}
                  alt={el.image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate">{el.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-1">
                  {el.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
