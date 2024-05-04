import { CartContext } from "@/app/_context/cart";
import { useContext } from "react";
import CartItem from "../cart-item";
import { Card, CardContent } from "./card";
import { formatCurrency } from "@/app/_helpers/price";
import { Separator } from "./separator";
import { Button } from "./button";

const Cart = () => {
  const { products, subTotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);
  return (
    <div className="flex h-full flex-col py-5">
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-4">
            {products.map((product) => (
              <CartItem key={product.id} cartProduct={product} />
            ))}
          </div>
          <div className="mt-6">
            <Card>
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-sm">
                    {formatCurrency(subTotalPrice)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Entrega</span>
                  {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                    <span className="text-primary">Grátis</span>
                  ) : (
                    <span className="text-sm">
                      {formatCurrency(
                        Number(products?.[0].restaurant.deliveryFee),
                      )}
                    </span>
                  )}
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Descontos
                  </span>
                  <span className="text-sm">
                    - {formatCurrency(totalDiscounts)}
                  </span>
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-semibold">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button className="mt-6 w-full font-semibold">
            Finalizar pedido
          </Button>
        </>
      ) : (
        <h2 className="font-medium">Sua sacola está vazia.</h2>
      )}
    </div>
  );
};

export default Cart;
