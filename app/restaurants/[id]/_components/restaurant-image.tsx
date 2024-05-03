"use client";

import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  Restaurant: Pick<Restaurant, "imageUrl" | "name">;
}

const RestaurantImage = ({ Restaurant }: RestaurantImageProps ) => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={Restaurant.imageUrl}
        alt={Restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button size="icon" className="absolute right-4 top-4 rounded-full size-9">
              <Heart className="fill-secondary size-5" />
          </Button>
    </div>
  );
};

export default RestaurantImage;
