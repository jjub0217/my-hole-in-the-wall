import useGetFavoritePlaces from "../../api/useGetFavoritePlaces";
import { FavoriteContainer } from "../Favorite/FavoriteContainer";
import { RestaurantsContainer } from "../Restaurants/RestaurantsContainer";

export const MainPage = () => {
  const { favoriteRestaurants, refetchFavoritePlaces } = useGetFavoritePlaces();
  return (
    <main>
      <div className="inner">
        <FavoriteContainer
          favoriteRestaurants={favoriteRestaurants}
          refetchFavoritePlaces={refetchFavoritePlaces}
        />
        <RestaurantsContainer
          favoriteRestaurants={favoriteRestaurants}
          refetchFavoritePlaces={refetchFavoritePlaces}
        />
      </div>
    </main>
  );
};
