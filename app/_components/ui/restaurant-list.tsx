import React from "react";
import RestaurantItem from "../ui/restaurant-item";
import { db } from "@/app/_lib/prisma";

const RestaurantList = async() => {
    const restaurants = await db.restaurant.findMany({take: 10});
    return ( 
        <div className="flex gap-4 px-5 overflow-x-hidden ">
            {restaurants.map((restaurant) => (
                <RestaurantItem key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
    );
}
 
export default RestaurantList;