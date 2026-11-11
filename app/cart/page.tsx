"use client";
import {CartRow,SummaryCard,EmptyState,useCartStore,Header,Footer,CouponCard,} from "./import";

import { useRouter } from "next/navigation";
import useFromStore from "@/app/hooks/useFromStore";
import { summarize } from "@/app/store/cartUtils";

export default function CartPage() {
  
  const router = useRouter();

  // Read persisted cart only after mount to avoid an SSR hydration mismatch.
  const items = useFromStore(useCartStore, (state) => state.cart) ?? [];
  const coupon = useFromStore(useCartStore, (state) => state.couponCode) ?? "";
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const setCouponCode = useCartStore((state) => state.setCouponCode);
  const clearCart = useCartStore((state) => state.clearCart);

  // Shipping is chosen on the payment page; the cart shows the pre-shipping total.
  const shippingCost = 0;
  const { subtotal, discount, total } = summarize(items, coupon);

  const removeItem = (id: string) => removeFromCart({ _id: id });

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
                      onQty={updateQuantity}
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
                    handelClick={() => router.push("/payment")}
                  />
                  <CouponCard
                    value={coupon}
                    onChange={setCouponCode}
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
