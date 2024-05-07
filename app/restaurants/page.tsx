import Restaurants from "./_components/restaurants";
import { Suspense } from "react";
const RestaurantsPage = () => {
  return (
      <Suspense>
        <Restaurants />
      </Suspense>
  );
};

export default RestaurantsPage;
