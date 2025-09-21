import { create } from "zustand";
import { ProductsEntity } from "@/app/types";
import { persist } from "zustand/middleware";

// Define the interface of the cart state
interface State {
  totalPrice: number;
  totalItems: number;
  cart: ProductsEntity[];
}

// Define the interface of actions
interface Actions {
  addToCart: (product: ProductsEntity, quantity?: number) => void;
  removeFromCart: (product: ProductsEntity) => void;
}

// Initial state
const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

// Zustand store
export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...INITIAL_STATE,
      addToCart: (product: ProductsEntity, quantity: number = 1) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === product._id);

        // If item already exists, increase its quantity
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === product._id
              ? {
                  ...item,
                  quantity: (item.quantity as number) + quantity,
                }
              : item
          );

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + quantity,
            totalPrice: state.totalPrice + product.price * quantity,
          }));
        } else {
          // If item is new, add to cart
          const updatedCart = [...cart, { ...product, quantity }];
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + quantity,
            totalPrice: state.totalPrice + product.price * quantity,
          }));
        }
      },

      removeFromCart: (product: ProductsEntity) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === product._id);

        if (!cartItem) return;

        const updatedCart = cart.filter((item) => item._id !== product._id);

        set((state) => ({
          cart: updatedCart,
          totalItems: state.totalItems - (cartItem.quantity || 1),
          totalPrice: state.totalPrice - product.price * (cartItem.quantity || 1),
        }));
      },
    }),
    {
      name: "cart-storage", // LocalStorage key
    }
  )
);
