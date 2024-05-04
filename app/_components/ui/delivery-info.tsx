import { BikeIcon, TimerIcon } from "lucide-react";
import { Restaurant } from "@prisma/client";
import { formatCurrency } from "@/app/_helpers/price";
import { Card } from "./card";
interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <>
      <Card className="my-4 flex justify-around  py-3">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon className="size-4" />
          </div>
          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="text-sm font-semibold">
              {formatCurrency(Number(restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-sm font-semibold">Grátis</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <TimerIcon className="size-4" />
          </div>
          <span className="text-sm font-semibold">
            {restaurant.deliveryTimeMinutes}min
          </span>
        </div>
      </Card>
    </>
  );
};

export default DeliveryInfo;
