import { create } from "zustand";
import { ProductsEntity } from "@/app/types";
import { persist } from "zustand/middleware";
import {
  addItem,
  CartItem,
  removeItem,
  setItemQuantity,
  summarize,
} from "./cartUtils";

export type { CartItem } from "./cartUtils";

interface State {
  cart: CartItem[];
  couponCode: string;
  // Derived from `cart` + `couponCode` on every change; kept in state so
  // existing selectors keep working.
  totalItems: number;
  totalPrice: number; // payable amount after coupon discount (shipping excluded)
  discount: number; // coupon discount amount
}

interface Actions {
  addToCart: (product: ProductsEntity, quantity?: number) => void;
  removeFromCart: (product: Pick<ProductsEntity, "_id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setCouponCode: (code: string) => void;
  clearCart: () => void;
}

const INITIAL_STATE: State = {
  cart: [],
  couponCode: "",
  totalItems: 0,
  totalPrice: 0,
  discount: 0,
};

const withTotals = (cart: CartItem[], couponCode: string) => {
  const { totalItems, total, discount } = summarize(cart, couponCode);
  return { cart, couponCode, totalItems, totalPrice: total, discount };
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...INITIAL_STATE,
      addToCart: (product, quantity = 1) =>
        set(withTotals(addItem(get().cart, product, quantity), get().couponCode)),

      removeFromCart: (product) =>
        set(withTotals(removeItem(get().cart, product._id), get().couponCode)),

      updateQuantity: (id, quantity) =>
        set(withTotals(setItemQuantity(get().cart, id, quantity), get().couponCode)),

      setCouponCode: (code) => set(withTotals(get().cart, code)),

      clearCart: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: "cart-storage", // Key for LocalStorage
      version: 1,
      // v0 stored running totals that could drift; recompute them from the cart.
      migrate: (persisted) => {
        const old = (persisted ?? {}) as Partial<State>;
        const cart = Array.isArray(old.cart) ? old.cart : [];
        return { ...withTotals(cart, "") } as State & Actions;
      },
    }
  )
);
