import { create } from "zustand";
import { ProductsEntity } from "@/app/types";
import { persist } from "zustand/middleware";

// Define the interface for the cart state
interface State {
  totalPrice: number;
  totalItems: number;
  cart: ProductsEntity[];
  discount: number; // store discount percentage
}

// Define the interface for actions
interface Actions {
  addToCart: (product: ProductsEntity, quantity?: number) => void;
  removeFromCart: (product: ProductsEntity) => void;
  setDiscountedTotal: (discount: number) => void;
}

// Initial state
const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  discount: 0,
};

// Create Zustand store
export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...INITIAL_STATE,
      addToCart: (product: ProductsEntity, quantity: number = 1) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === product._id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === product._id 
              ? { ...item, quantity: (item.quantity as number) + quantity } 
              : item
          );

          set((state) => {
            const newTotal = state.totalPrice + product.price * quantity;
            return {
              cart: updatedCart,
              totalItems: state.totalItems + quantity,
              totalPrice: newTotal,
            };
          });
        } else {
          
          const updatedCart = [...cart, { ...product, quantity }];
          set((state) => {
            const newTotal = state.totalPrice + product.price * quantity;
            return {
              cart: updatedCart,
              totalItems: state.totalItems + quantity,
              totalPrice: newTotal,
            };
          });
        }
      },

      removeFromCart: (product: ProductsEntity) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === product._id);

        if (!cartItem) return;

        const updatedCart = cart.filter((item) => item._id !== product._id);

        set((state) => {
          const newTotal = state.totalPrice - product.price * (cartItem.quantity || 1);
          return {
            cart: updatedCart,
            totalItems: state.totalItems - (cartItem.quantity || 1),
            totalPrice: newTotal,
          };
        });
      },

      //function  apply discount
      setDiscountedTotal: (discountAmount: number) => {
        const { cart } = get();
        const totalBeforeDiscount = cart.reduce(
          (acc, item) => acc + item.price * (item.quantity || 1),
          0
        );
          const discountedTotal = Math.max(totalBeforeDiscount - discountAmount, 0); // clamp at 0

        set(() => ({
          totalPrice: discountedTotal,
          discount: discountAmount,
        }));
},

    }),
    {
      name: "cart-storage", // Key for LocalStorage
    }
  )
);
