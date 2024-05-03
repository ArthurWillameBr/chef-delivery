"use client";

import DeliveryInfo from "@/app/_components/delivery-info";
import { Button } from "@/app/_components/ui/button";
import DiscountBadge from "@/app/_components/ui/discount-badge";
import ProductList from "@/app/_components/ui/product-list";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="flex items-center gap-1 px-5">
        <div className="relative size-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className="mt-2 px-4 text-xl font-semibold">{product.name}</h1>

      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>

            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 px-5 text-center">
          <Button
            className="border border-solid border-muted-foreground focus:text-primary"
            variant="ghost"
            size="icon"
            onClick={handleDecreaseQuantity}
          >
            <MinusCircleIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button
            className="border border-solid border-muted-foreground focus:text-primary"
            variant="ghost"
            size="icon"
            onClick={handleIncreaseQuantity}
          >
            <PlusCircleIcon />
          </Button>
        </div>
      </div>
      <div className="px-5">
        <DeliveryInfo restaurant={product.restaurant} />
      </div>
      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3 ">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <div className="">
          <ProductList products={complementaryProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
