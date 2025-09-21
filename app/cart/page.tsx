"use client";
import { CartRow ,SummaryCard ,CouponCard , ShippingCard 
,EmptyState ,useCartStore ,Header ,Footer } from "./import";
import { useMemo, useState } from "react";

// ----- Types -----
export type CartItem = {
    id: string;
    title: string;
    team?: string;
    variant?: string;
    price: number;
    image: string;
    qty: number;
    maxQty?: number;
};


const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const DEMO_ITEMS: CartItem[] = [
    { id: "1", title: "کیت خانگی", team: "رئال مادرید 24/25", variant: "XL / بدون اسم", price: 1580000, image: "/kits/real-home.jpg", qty: 1, maxQty: 5 },
    { id: "2", title: "کیت دوم", team: "بارسلونا 24/25", variant: "L / با اسم", price: 1460000, image: "/kits/barca-away.jpg", qty: 2, maxQty: 5 },
];

export default function CartPage() {
    const [items, setItems] = useState<CartItem[]>(DEMO_ITEMS);
    const [coupon, setCoupon] = useState("");
    const [shipping, setShipping] = useState<"standard" | "express">("standard");
    //store state
    const products = useCartStore((state)=> state.cart )
    const totalItems = useCartStore((state)=> state.totalItems )
    //store actions
    const removeFromCart = useCartStore((state)=> state.removeFromCart )
    console.log(products);
    console.log(totalItems);
    
    
    const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);
    const shippingCost = shipping === "express" ? 45000 : 0;
    const discount = coupon.trim().toLowerCase() === "fan10" ? Math.round(subtotal * 0.1) : 0;
    const total = clamp(subtotal - discount + shippingCost, 0, Number.MAX_SAFE_INTEGER);

    const updateQty = (id: string, nextQty: number) => setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: clamp(nextQty, 1, it.maxQty ?? 99) } : it)));
    const removeItem = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));
    const clearCart = () =>{ 
        removeFromCart
        setItems([])
    };

    return (
    <>
        <Header />
            <main dir="rtl" className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white">
                    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
                        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">سبد خرید</h1>
                                <p className="mt-1 text-sm text-slate-500">کیت‌های منتخب شما برای تسویه آماده‌اند.</p>
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
                                            <CartRow key={it.id} it={it} onQty={updateQty} onRemove={removeItem} />
                                        ))}
                                    </div>
                                </section>

                                <aside className="lg:col-span-4">
                                    <div className="sticky top-4 space-y-4">
                                        <SummaryCard subtotal={subtotal} discount={discount} shippingCost={shippingCost} total={total} onCheckout={() => alert("پرداخت (دمو)")} />
                                        <CouponCard value={coupon} onChange={setCoupon} helper="کد تخفیف نمونه: FAN10" />
                                        <ShippingCard value={shipping} onChange={setShipping} />
                                        <a href="/" className="block w-full text-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100">
                                            بازگشت به صفحه اصلی
                                        </a>
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



