/* eslint-disable no-unused-vars */
"use client";

import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subTotalPrice: number;
  totalPrice: number;
  totalQuantity: number;
  totalDiscounts: number;
  addProductsToCart: ({ product, quantity, emptyCart }: {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    deliveryFee: true;
                };
            };
        };
    }>;
    quantity: number;
    emptyCart?: boolean;
}) => void
  decreaseProductQuantity: (productId: string) => void;
  IncreaseProductQuantity: (productId: string) => void;
  deleteProductCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subTotalPrice: 0,
  totalPrice: 0,
  totalQuantity: 0,
  totalDiscounts: 0,
  addProductsToCart: () => {},
  decreaseProductQuantity: () => {},
  IncreaseProductQuantity: () => {},
  deleteProductCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0) + Number(products?.[0]?.restaurant?.deliveryFee);
  }, [products]);


  const totalQuantity = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products])

  const totalDiscounts = subTotalPrice - totalPrice + Number(products?.[0]?.restaurant?.deliveryFee);

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const deleteProductCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  const IncreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const addProductsToCart = (
    {product, quantity, emptyCart}: {
      product: Prisma.ProductGetPayload<{
        include: {
          restaurant: {
            select: {
              deliveryFee: true;
            };
          };
        };
      }>,
      quantity: number,
      emptyCart?: boolean,
    }
  ) => {
    if(emptyCart) {
      setProducts([])
    }

    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
          return cartProduct;
        }),
      );
    }

    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductsToCart,
        totalPrice,
        totalQuantity,
        subTotalPrice,
        totalDiscounts,
        decreaseProductQuantity,
        IncreaseProductQuantity,
        deleteProductCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
