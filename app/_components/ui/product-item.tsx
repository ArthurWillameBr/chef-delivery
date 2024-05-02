import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { ArrowDownIcon } from "lucide-react";
interface ProductItemPros {
  product: Prisma.ProductGetPayload<{
    include: {
        restaurant: {
            select: {
                name: true
            }
        }
    }
  }>;
}

const ProductItem = ({ product }: ProductItemPros) => {
  return (
    <main className="w-[150px] min-w-[150px] space-y-2">
      <div className=" relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-lg"
        />
      
      {product.discountPercentage && (
        <div className="absolute top-2 gap-[3px] left-2 flex items-center bg-primary py-[2px] px-2 rounded-full text-white">
            <ArrowDownIcon className="size-4"/>
            <span className="font-semibold text-xs">{product.discountPercentage}%</span>
        </div>
      )}
      </div>
      <div>
        <h2 className="text-sm truncate">{product.name}</h2>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>
        <span className="text-muted-foreground text-xs block">{product.restaurant.name}</span>
      </div>
    </main>
  );
};

export default ProductItem;
