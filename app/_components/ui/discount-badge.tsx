import { ArrowDownIcon } from "lucide-react";
import { Product } from "@prisma/client";
import { cn } from "@/app/_lib/utils";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscountBadge = ({ product}: DiscountBadgeProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-[3px] rounded-full bg-primary px-2 py-[2px] text-primary-foreground",
      )}
    >
      <ArrowDownIcon className="size-4" />
      <span className="text-xs font-semibold">
        {product.discountPercentage}%
      </span>
    </div>
  );
};

export default DiscountBadge;
