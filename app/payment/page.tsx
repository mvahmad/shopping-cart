"use client";
import { useEffect, useState } from "react";
import PeymentForm from "@/app/components/paymentForm/paymentForm";
import { Footer, Header } from "../products/import";
import {ShippingCard, SummaryCard, useCartStore } from "../cart/import";
import { useRouter } from "next/navigation";
import PaymentCard from "../components/paymentCaerd/paymentCard";
import { usePostServices } from "../hooks/usePostServices";
import { postOrder } from "../hooks/queryHooks/orders";
import { toast } from "react-toastify";
import Link from "next/link";
import useFromStore from "../hooks/useFromStore";
import { summarize } from "../store/cartUtils";
import { getStoredUser } from "../services/session";
import { AxiosError } from "axios";

const SHIPPING_COST = { standard: 0, express: 45000 } as const;

export default function Peyment() {
  const router = useRouter()
  // Read persisted cart only after mount to avoid an SSR hydration mismatch.
  const products = useFromStore(useCartStore, (state) => state.cart) ?? [];
  const couponCode = useFromStore(useCartStore, (state) => state.couponCode) ?? "";
  const clearCart = useCartStore((state) => state.clearCart);
  const [userID, setUserID] = useState<string | null>(null);
  const [shipping, setShipping] = useState<"standard" | "express">("standard");

  useEffect(() => {
    setUserID(getStoredUser()?._id ?? null);
  }, []);

  // Totals are derived from the live cart so they always match what is ordered.
  const { subtotal, discount } = summarize(products, couponCode);
  const shippingCost = SHIPPING_COST[shipping];
  const total = Math.max(subtotal - discount, 0) + shippingCost;

  const {mutate, isPending}=usePostServices({
      mutationKey:["PostOrders"],
      mutationFn:postOrder,
      options:{
        onSuccess: () => {
          toast.success("سفارش با موفقیت ثبت شد");
          clearCart();
          router.push("/payment/result?status=success");
        },
        onError: (error) => {
          const message =
            (error as AxiosError<{ message?: string }>).response?.data?.message ||
            error.message ||
            "خطا در ثبت سفارش";
          toast.error(message, { rtl: false });
          router.push("/payment/result?status=failed");
        },
      }
  })

  // Handle order
  function handleOrderButton() {
    if (isPending) return;
    if (!userID) {
      toast.error("کاربر یافت نشد");
      return ;
    }
    if (products.length === 0) {
      toast.error("سبد خرید شما خالی است");
      return;
    }
    mutate({
      user: userID,
      products: products.map((product) => ({
        product: product._id,
        count: product.quantity,
      })),
    });
  }

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
                نهایی کردن خرید
              </h1>
            </div>
          </header>
          <div className="grid grid-cols-1 min-[960px]:grid-cols-12 gap-6">
            <section className="min-[960px]:col-span-8">
              <div className=" rounded-3xl border border-slate-200 bg-white p-6">
                 <h2 className="text-lg font-extrabold text-slate-900 mb-4">مشخصات خریدار:</h2>
                <PeymentForm />
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white mt-3 p-6">
                <h2 className="mb-4 text-lg font-extrabold text-slate-900">
                  سفارشات شما:
                </h2>
                {products.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    سبد خرید شما خالی است.{" "}
                    <Link href="/products" className="text-blue-600 hover:underline">
                      رفتن به فروشگاه
                    </Link>
                  </p>
                ) : (
                  <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3">
                    {products.map((item) => (
                      <PaymentCard item={item} key={item._id} />
                    ))}
                  </div>
                )}
              </div>
            </section>

            <aside className="lg:col-span-4 space-y-4">
              <SummaryCard
                discount={discount}
                shippingCost={shippingCost}
                subtotal={subtotal}
                total={total}
                linkDiscription={'ثبت سفارش'}
                handelClick={handleOrderButton}
                isLoading={isPending}
                isDisabled={products.length === 0}
              />
              <ShippingCard value={shipping} onChange={setShipping} />
              <Link
                href="/"
                className="block w-full text-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
              >
                بازگشت به صفحه اصلی
              </Link>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
