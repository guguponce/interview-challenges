import React, { createContext, useEffect, useState } from "react";
import { iCarrito, Product } from "../types";

interface contextValues {
  carrito: iCarrito[];
  handleAdd: (product: Product) => void;
  handleRemove: (id: string) => void;
  totalAmountProducts: number;
  amountToPay: number;
}

export const carritoContext = createContext<contextValues>({
  carrito: [],
  handleAdd: (product: Product) => {},
  handleRemove: (id: string) => {},
  totalAmountProducts: 0,
  amountToPay: 0,
});

export const CarritoProvider = ({ children }: { children: JSX.Element }) => {
  const [carrito, setCarrito] = useState<iCarrito[]>([]);
  const [totalAmountProducts, setTotalAmountProducts] = useState<number>(0);
  const [amountToPay, setToPay] = useState<number>(0);
  useEffect(() => {
    setTotalAmountProducts(
      carrito.reduce((accumulator, currentProduct, index) => {
        const returns = accumulator + currentProduct.quantity;
        return returns;
      }, 0)
    );

    setToPay(
      carrito.reduce((accumulator, currentProduct, index) => {
        const returns =
          accumulator + currentProduct.price * currentProduct.quantity;
        return returns;
      }, 0)
    );
  }, [carrito]);

  const handleAdd = (product: Product) => {
    setCarrito((carrito) => {
      if (carrito.some((prod) => prod.id === product.id)) {
        return [...carrito].map((prod) =>
          prod.id === product.id
            ? { ...prod, quantity: prod.quantity + 1 }
            : prod
        );
      } else {
        return [...carrito, { ...product, quantity: 1 }];
      }
    });
  };
  const handleRemove = (id: string) => {
    setCarrito((carrito) => {
      if (carrito.filter((prod) => prod.id === id)[0].quantity > 1) {
        return [...carrito].map((prod) =>
          prod.id === id ? { ...prod, quantity: prod.quantity - 1 } : prod
        );
      } else {
        return [...carrito].filter((prod) => prod.id !== id);
      }
    });
  };

  return (
    <carritoContext.Provider
      value={{
        amountToPay,
        totalAmountProducts,
        carrito,
        handleAdd,
        handleRemove,
      }}
    >
      {children}
    </carritoContext.Provider>
  );
};
