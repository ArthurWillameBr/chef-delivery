"use client";

import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, ClockIcon, Heart, StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";
import { cn } from "@/app/_lib/utils";
import { toggleFavoriteRestaurant } from "../../_actions/restaurant";
import { toast } from "sonner";

interface RestaurantItemProps {
  userId?: string;
  restaurant: Restaurant;
  className?: string;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}
const RestaurantItem = ({
  restaurant,
  className,
  userId,
  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const isFavorite = userFavoriteRestaurants.some(
    (fav) => fav.restaurantId === restaurant.id,
  );

  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleFavoriteRestaurant(userId, restaurant.id);
      toast.success(
        isFavorite
          ? "Restaurante removido dos favoritos."
          : "Restaurante favoritado.",
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante.");
    }
  };
  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full shadow-xl">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              fill
              className="rounded-lg object-cover"
              alt={restaurant.name}
            />
          </Link>
          <div className="absolute left-2 top-2 flex items-center gap-[3px] rounded-full bg-secondary px-2 py-[2px] text-accent-foreground">
            <StarIcon className="size-4 fill-yellow-400 text-yellow-400 shadow-lg" />
            <span className="text-xs font-semibold">5.0</span>
          </div>
          {userId && (
            <Button
              size="icon"
              className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
              onClick={handleFavoriteClick}
            >
              <Heart size={16} className="fill-white" />
            </Button>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3 ">
            <div className="flex items-center gap-1">
              <BikeIcon className="size-5 text-primary" />
              <span className="text-ss text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="size-5 text-primary" />
              <span className="text-ss text-muted-foreground">
                {restaurant.deliveryTimeMinutes}min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
