"use client";
import { useEffect, useState } from "react";
import PeymentForm from "@/app/components/paymentForm/paymentForm";
import { Footer, Header } from "../product/import";
import {ShippingCard, SummaryCard, useCartStore } from "../cart/import";
import { Card } from "@nextui-org/react";
import PaymentCard from "../components/paymentCaerd/paymentCard";

export default function Peyment() {
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);

  const [coupon, setCoupon] = useState("");
  const [shipping, setShipping] = useState<"standard" | "express">("standard");
  const products = useCartStore((state)=>state.cart)     
  // Load data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("orderSummary");
    if (data) {
      try {
        const summaryArray = JSON.parse(data); // [{ key: "subtotal", value: 10000 }, ...]
        const summary = Object.fromEntries(
          summaryArray.map((item: { key: string; value: number }) => [
            item.key,
            item.value,
          ])
        );

        console.log("Discount from localStorage:", summary.discount);
        setSubtotal(summary.subtotal || 0);
        setDiscount(summary.discount || 0);
        setShippingCost(summary.shippingCost || 0);
        setTotal(summary.total || 0);
      } catch (error) {
        console.error("Failed to parse order summary:", error);
      }
    }
  }, []);

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
                <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3">
                   {products.map((item)=>{
                   return( 
                        <PaymentCard item={item} key={item._id} />
                    )
                   })
                   }
                </div>

              </div>
            </section>

            <aside className="lg:col-span-4 space-y-4">
              <SummaryCard
                discount={discount}
                shippingCost={shippingCost}
                subtotal={subtotal}
                total={total}
                link="#"
              />
              <ShippingCard value={shipping} onChange={setShipping} />
              <a
                href="/"
                className="block w-full text-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
              >
                بازگشت به صفحه اصلی
              </a>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
