"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import Cart from "@/app/_components/ui/cart";
import DiscountBadge from "@/app/_components/ui/discount-badge";
import ProductList from "@/app/_components/ui/product-list";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addProductsToCart, products } = useContext(CartContext);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  console.log(products);
  const addToCart = ({emptyCart}: {emptyCart?: boolean}) => {
    addProductsToCart({product, quantity, emptyCart});
    setIsCartOpen(true);
  };
  const handleAddToCart = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== cartProduct.restaurantId,
    );

    if (!hasDifferentRestaurantProduct) {
      return setConfirmationDialogOpen(true);
    }
    addToCart({
      emptyCart: false,
    })
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
        <Link href={`/restaurants/${product.restaurant.id}`}>
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
        </Link>
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
          <Card className="my-4 flex justify-around  py-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <BikeIcon className="size-4" />
              </div>
              {Number(product.restaurant.deliveryFee) > 0 ? (
                <p className="text-sm font-semibold">
                  {formatCurrency(Number(product.restaurant.deliveryFee))}
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
                {product.restaurant.deliveryTimeMinutes}min
              </span>
            </div>
          </Card>
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
        <div className="mt-4 px-5">
          <Button className="w-full font-semibold" onClick={handleAddToCart}>
            Adicionar a sacola
          </Button>
        </div>
      </div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você so pode adicionar itens de um restaurante por vez
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo adicionar esse produto? isso limpará sua sacola.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({emptyCart: true})}>Esvaziar sacola e adicionar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
