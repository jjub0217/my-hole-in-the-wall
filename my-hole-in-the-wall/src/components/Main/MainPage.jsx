import { FavoriteContainer } from "../Favorite/FavoriteContainer";
import { RestaurantsContainer } from "../Restaurants/RestaurantsContainer";

export const MainPage = () => {
  return (
    <main>
      <div className="inner">
        <RestaurantsContainer />
        <FavoriteContainer />
      </div>
    </main>
  );
};
