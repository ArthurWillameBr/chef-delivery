import Header from "@/app/_components/ui/header";
import RestaurantItem from "@/app/_components/ui/restaurant-item";
import { db } from "@/app/_lib/prisma";

const RecommendedPage = async () => {
  const restaurants = await db.restaurant.findMany({});
  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="py-4 text-lg font-semibold ">Restaurantes favoritos</h1>
        <div className="flex flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedPage;
