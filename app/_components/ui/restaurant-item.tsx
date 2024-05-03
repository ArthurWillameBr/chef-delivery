import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { BikeIcon, ClockIcon, Heart, StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";

interface RestaurantItemProps {
  restaurant: Restaurant;
}
const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <Link className="min-w-[266px] max-w-[266px]" href={`/restaurants/${restaurant.id}`}>
      <div className="space-y-3 w-full">
        <div className="relative h-[136px] w-full shadow-xl">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-lg object-cover"
          />
        
          <div className="absolute top-2 gap-[3px] left-2 flex items-center bg-secondary py-[2px] px-2 rounded-full text-accent-foreground">
              <StarIcon className="size-4 fill-yellow-400 text-yellow-400 shadow-lg"/>
              <span className="font-semibold text-xs">
                  5.0
              </span>
          </div>
          <Button size="icon" className="absolute right-2 top-2 rounded-full size-7">
              <Heart className="fill-secondary size-4" />
          </Button>
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
    </Link>
  );
};

export default RestaurantItem;
