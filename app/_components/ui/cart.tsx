import { CartContext } from "@/app/_context/cart";
import { useContext, useState } from "react";
import CartItem from "../cart-item";
import { Card, CardContent } from "./card";
import { formatCurrency } from "@/app/_helpers/price";
import { Separator } from "./separator";
import { Button } from "./button";
import { createOrder } from "@/app/_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CartProps {
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({setIsOpen }: CartProps) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const router = useRouter()
  const { data } = useSession();
  const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;

    const restaurant = products?.[0].restaurant;
    try {
      setIsSubmitLoading(true);
      await createOrder({
        subtotalPrice,
        totalPrice,
        totalDiscounts,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
      });

      clearCart();
      setIsOpen(false);
      toast("Pedido finalizado com sucesso!", {
        description: "Você pode acompanhá-lo na tela dos seus pedidos.",
        action: {
          label: "Meus Pedidos",
          onClick: () => router.push("/my-orders"),
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };
  return (
    <>
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
                      {formatCurrency(subtotalPrice)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Entrega
                    </span>
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
            <div>
              <Button
                className="mt-6 w-full font-semibold"
                onClick={() => setIsConfirmDialogOpen(true)}
                disabled={isSubmitLoading}
              >
                Finalizar pedido
              </Button>
            </div>
          </>
        ) : (
          <h2 className="font-medium">Sua sacola está vazia.</h2>
        )}
      </div>
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termos e condições
              da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishOrderClick}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
