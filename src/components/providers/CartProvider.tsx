"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/data";
import { useSession } from "next-auth/react";

export interface CartItem extends Product {
  quantity: number;
}

interface OrderDetails {
  items: CartItem[];
  total: number;
  shippingInfo: {
    fullName: string;
    mobile: string;
    address: string;
    pincode: string;
    state: string;
    city: string;
  };
  paymentMode: string;
  orderId: string;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
  // Temporary storage for checkout
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const { data: session, status } = useSession();

  // Process Pending Cart Item from localStorage after login
  useEffect(() => {
    if (status === "authenticated") {
      const pendingStr = localStorage.getItem("pending_cart_item");
      if (pendingStr) {
        try {
          const { product, quantity } = JSON.parse(pendingStr);
          addToCart(product, quantity);
          localStorage.removeItem("pending_cart_item");
          // Dispatch a custom event to notify components
          window.dispatchEvent(new CustomEvent("cart-updated-from-pending"));
        } catch (e) {
          console.error("Failed to parse pending cart item", e);
        }
      }
    }
  }, [status]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearCart,
        cartTotal,
        cartCount,
        wishlistCount,
        lastOrder,
        setLastOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
