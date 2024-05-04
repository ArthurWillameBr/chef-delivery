"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./_actions/search";
import Header from "../_components/ui/header";
import RestaurantItem from "../_components/ui/restaurant-item";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

const searchFor = searchParams.get("search");
useEffect(() => {
    const fetchRestaurants = async () => {
        if (!searchFor) return;
        const foundRestaurants = await searchForRestaurants(searchFor);
        setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
}, [searchParams, searchFor]);

if (!searchFor) {
    return notFound();
}
  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="py-4 text-lg font-semibold ">
          Restaurantes Encontrados
        </h1>
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

export default Restaurants;
