"use client";
import {CartRow,SummaryCard,EmptyState,useCartStore,Header,Footer,CouponCard,} from "./import";
import { useEffect, useMemo, useState } from "react";
import { ProductsEntity } from "@/app/types";
import { useRouter } from "next/navigation";

// Utility to clamp a number between min and max
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export default function CartPage() {
  const [coupon, setCoupon] = useState("");
  const [shipping, setShipping] = useState<"standard" | "express">("standard");
  const router = useRouter();

  // Zustand store
  const products = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const setDiscountedTotal = useCartStore((state) => state.setDiscountedTotal);

  // Local state for rendering cart items
  const [items, setItems] = useState<ProductsEntity[]>([]);

  // Ensure Zustand data is set to local state only after mount (avoid SSR mismatch)
  useEffect(() => {
    setItems(products);
  }, [products]);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  );

  const shippingCost = shipping === "express" ? 45000 : 0;
  const discount =
    coupon.trim().toLowerCase() === "fan10"
      ? Math.round(subtotal * 0.1)
      : 0;
  const total = clamp(subtotal - discount + shippingCost, 0, Number.MAX_SAFE_INTEGER);
  useEffect(()=>{
    setDiscountedTotal(discount); // Update total in Zustand store
  },[discount])
  

  // Handlers
  const updateQty = (id: string, nextQty: number) => {
    if (nextQty < 1) return;
    setItems((prev) =>
      prev.map((it) => (it._id === id ? { ...it, quantity: nextQty } : it))
    );
  };

  const removeItem = (id: string) => {
    const item = items.find((it) => it._id === id);
    if (!item) return;
    removeFromCart(item);
    setItems((prev) => prev.filter((it) => it._id !== id));
  };

  const clearCart = () => {
    items.forEach((it) => removeFromCart(it));
    setItems([]);
  };

  const handleSubmitSummaryCard = () => {
    const summary = [
      { key: "subtotal", value: subtotal },
      { key: "discount", value: discount },
      { key: "shippingCost", value: shippingCost },
      { key: "total", value: total },
    ];
    // Only runs on client
    if (typeof window !== "undefined") {
      localStorage.setItem("orderSummary", JSON.stringify(summary));
    }
     router.push("/payment");
  };

  return (
    <>
      <Header />
      <main
        dir="rtl"
        className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
          <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                سبد خرید
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                کیت‌های منتخب شما برای تسویه آماده‌اند.
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="self-start rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 shadow hover:bg-rose-100"
              >
                خالی کردن سبد
              </button>
            )}
          </header>

          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <section className="lg:col-span-8">
                <div className="divide-y divide-slate-100 rounded-3xl border border-slate-200 bg-white">
                  {items.map((it) => (
                    <CartRow
                      key={it._id}
                      it={it}
                      onQty={updateQty}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </section>

              <aside className="lg:col-span-4">
                <div className="sticky top-4 space-y-4">
                  <SummaryCard
                    subtotal={subtotal}
                    discount={discount}
                    shippingCost={shippingCost}
                    total={total}
                    linkDiscription={"ادامه"}
                    handelClick={handleSubmitSummaryCard}
                  />
                  <CouponCard
                    value={coupon}
                    onChange={setCoupon}
                    helper="کد تخفیف نمونه: FAN10"
                  />
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}



