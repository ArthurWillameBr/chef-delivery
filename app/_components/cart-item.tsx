import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { MinusCircleIcon, PlusCircleIcon, Trash } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    IncreaseProductQuantity,
    deleteProductCart,
  } = useContext(CartContext);
  const handleDecreaseQuantityClick = () => {
    decreaseProductQuantity(cartProduct.id);
  };
  const handleIncreaseProductQuantityClick = () => {
    IncreaseProductQuantity(cartProduct.id);
  };
  const handleDeleteProductCart = () => {
    deleteProductCart(cartProduct.id);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-center">
            <Button
              className="size-8 border border-solid border-muted-foreground focus:text-primary"
              variant="ghost"
              size="icon"
              onClick={handleDecreaseQuantityClick}
            >
              <MinusCircleIcon className="size-5" />
            </Button>
            <span className="w-4">{cartProduct.quantity}</span>
            <Button
              className="size-8 border border-solid border-muted-foreground focus:text-primary"
              variant="ghost"
              size="icon"
              onClick={handleIncreaseProductQuantityClick}
            >
              <PlusCircleIcon className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="size-8 border border-muted-foreground hover:text-red-500"
        onClick={handleDeleteProductCart}
      >
        <Trash className="size-5" />
      </Button>
    </div>
  );
};

export default CartItem;
