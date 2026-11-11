// Pure cart helpers (no React / Zustand imports) so they can be unit-tested
// in isolation with `npm test`.
import type { ProductsEntity } from "../types";

/**
 * A cart line. `quantity` holds the number of units in the cart (it overrides
 * the product's stock count coming from the API), and `stock` keeps the
 * available inventory captured when the item was added.
 */
export type CartItem = ProductsEntity & { stock?: number };

export const COUPONS: Record<string, number> = {
  fan10: 0.1,
};

/** Discount rate (0..1) for a coupon code, 0 when the code is unknown. */
export const getCouponRate = (code: string | undefined | null): number =>
  COUPONS[(code ?? "").trim().toLowerCase()] ?? 0;

/** Unit price after the product's percentage discount, as shown on product cards. */
export const getUnitPrice = (p: Pick<ProductsEntity, "price" | "discount">): number => {
  const price = Number(p.price) || 0;
  const discount = Math.min(Math.max(Number(p.discount) || 0, 0), 100);
  return Math.round(price - price * (discount / 100));
};

const maxFor = (item: { stock?: number }) =>
  typeof item.stock === "number" && item.stock >= 0 ? item.stock : Infinity;

/** Clamp a requested quantity to [1, stock]. Returns 0 when nothing can be added. */
export const clampQuantity = (requested: number, stock?: number): number => {
  if (!Number.isFinite(requested)) return 0;
  const max = maxFor({ stock });
  return Math.max(0, Math.min(Math.floor(requested), max));
};

export const addItem = (
  cart: CartItem[],
  product: ProductsEntity,
  quantity = 1
): CartItem[] => {
  if (!Number.isFinite(quantity) || quantity <= 0) return cart;
  const existing = cart.find((item) => item._id === product._id);
  if (existing) {
    const next = clampQuantity(existing.quantity + quantity, existing.stock);
    if (next === existing.quantity) return cart;
    return cart.map((item) =>
      item._id === product._id ? { ...item, quantity: next } : item
    );
  }
  // `product.quantity` is the inventory reported by the API.
  const stock = typeof product.quantity === "number" ? product.quantity : undefined;
  const next = clampQuantity(quantity, stock);
  if (next <= 0) return cart;
  return [...cart, { ...product, stock, quantity: next }];
};

export const setItemQuantity = (
  cart: CartItem[],
  id: string,
  quantity: number
): CartItem[] => {
  const existing = cart.find((item) => item._id === id);
  if (!existing) return cart;
  const next = clampQuantity(quantity, existing.stock);
  if (next < 1 || next === existing.quantity) return cart;
  return cart.map((item) => (item._id === id ? { ...item, quantity: next } : item));
};

export const removeItem = (cart: CartItem[], id: string): CartItem[] =>
  cart.filter((item) => item._id !== id);

export interface CartSummary {
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
}

/** Derive all totals from the cart so they can never drift out of sync. */
export const summarize = (cart: CartItem[], couponCode = ""): CartSummary => {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + getUnitPrice(item) * (item.quantity || 0),
    0
  );
  const discount = Math.round(subtotal * getCouponRate(couponCode));
  return { totalItems, subtotal, discount, total: Math.max(subtotal - discount, 0) };
};

/** Quantity of a product already in the cart. */
export const quantityInCart = (cart: CartItem[], id: string): number =>
  cart.find((item) => item._id === id)?.quantity ?? 0;
