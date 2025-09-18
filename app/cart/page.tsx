"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import Heder from "@/app/components/ui/header";
import  Footer  from "@/app/components/ui/footer";
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

const toman = (v: number) => new Intl.NumberFormat("fa-IR").format(v) + " تومان";
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const DEMO_ITEMS: CartItem[] = [
    { id: "1", title: "کیت خانگی", team: "رئال مادرید 24/25", variant: "XL / بدون اسم", price: 1580000, image: "/kits/real-home.jpg", qty: 1, maxQty: 5 },
    { id: "2", title: "کیت دوم", team: "بارسلونا 24/25", variant: "L / با اسم", price: 1460000, image: "/kits/barca-away.jpg", qty: 2, maxQty: 5 },
];

export default function CartPage() {
    const [items, setItems] = useState<CartItem[]>(DEMO_ITEMS);
    const [coupon, setCoupon] = useState("");
    const [shipping, setShipping] = useState<"standard" | "express">("standard");

    const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);
    const shippingCost = shipping === "express" ? 45000 : 0;
    const discount = coupon.trim().toLowerCase() === "fan10" ? Math.round(subtotal * 0.1) : 0;
    const total = clamp(subtotal - discount + shippingCost, 0, Number.MAX_SAFE_INTEGER);

    const updateQty = (id: string, nextQty: number) => setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: clamp(nextQty, 1, it.maxQty ?? 99) } : it)));
    const removeItem = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));
    const clearCart = () => setItems([]);

    return (
        <>
          <Heder />
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

function CartRow({
    it,
    onQty,
    onRemove,
}: {
    it: CartItem;
    onQty: (id: string, next: number) => void;
    onRemove: (id: string) => void;
}) {
    return (
        <div className="flex flex-col gap-4 p-4 sm:p-5 md:p-6 md:flex-row md:items-center">
            {/* Image */}
            <div className="relative h-28 w-full overflow-hidden rounded-2xl ring-1 ring-slate-100 sm:w-40">
                <Image src={it.image} alt={it.title} fill sizes="(min-width: 640px) 10rem, 100vw" className="object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-1">
                    <h3 className="truncate text-base md:text-lg font-bold text-slate-900">{it.title}</h3>
                    {it.team && <p className="truncate text-sm text-slate-600">{it.team}</p>}
                    {it.variant && <p className="text-xs text-slate-500">{it.variant}</p>}
                </div>
                <div className="mt-3 flex items-center gap-4">
                    {/* Qty */}
                    <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-1">
                        <button
                            onClick={() => onQty(it.id, it.qty - 1)}
                            className="grid h-8 w-8 place-items-center text-slate-700 hover:bg-white rounded-lg"
                        >
                            −
                        </button>
                        <input
                            type="number"
                            value={it.qty}
                            onChange={(e) => onQty(it.id, Number(e.target.value))}
                            className="h-8 w-12 bg-transparent text-center text-sm font-bold outline-none text-slate-600"
                            min={1}
                            max={it.maxQty ?? 99}
                        />
                        <button
                            onClick={() => onQty(it.id, it.qty + 1)}
                            className="grid h-8 w-8 place-items-center text-slate-700 hover:bg-white rounded-lg"
                        >
                            +
                        </button>
                    </div>

                    {/* Remove */}
                    <button
                        onClick={() => onRemove(it.id)}
                        className="text-xs font-bold text-rose-600 hover:underline"
                    >
                        حذف
                    </button>
                </div>
            </div>

            {/* Price */}
            <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-base md:text-lg font-extrabold text-slate-900">{toman(it.price * it.qty)}</span>
                <span className="text-xs text-slate-400">{toman(it.price)} / عدد</span>
            </div>
        </div>
    );
}

function SummaryCard({
    subtotal,
    discount,
    shippingCost,
    total,
    onCheckout,
}: {
    subtotal: number;
    discount: number;
    shippingCost: number;
    total: number;
    onCheckout: () => void;
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h4 className="mb-4 text-lg font-extrabold text-slate-900">خلاصه سفارش</h4>
            <div className="space-y-2 text-sm">
                <Row label="جمع جزء" value={toman(subtotal)} />
                <Row label="تخفیف" value={discount ? `− ${toman(discount)}` : toman(0)} muted={!discount} />
                <Row label="ارسال" value={shippingCost ? toman(shippingCost) : "رایگان"} />
            </div>
            <div className="my-3 h-px bg-slate-100" />
            <Row label={<span className="font-extrabold">مبلغ قابل پرداخت</span>} value={<span className="font-extrabold">{toman(total)}</span>} />
            <button
                onClick={onCheckout}
                className="mt-4 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow hover:bg-blue-700"
            >
                ادامه فرآیند خرید
            </button>
            <p className="mt-2 text-center text-xs text-slate-500">پرداخت امن • بازگشت وجه تا ۷ روز</p>
        </div>
    );
}

function CouponCard({ value, onChange, helper }: { value: string; onChange: (v: string) => void; helper?: string }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="کد تخفیف"
                    className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:bg-white"
                />
                <span className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">اعمال</span>
            </div>
            {helper && <p className="mt-2 text-xs text-slate-400">{helper}</p>}
        </div>
    );
}

function ShippingCard({
    value,
    onChange,
}: {
    value: "standard" | "express";
    onChange: (v: "standard" | "express") => void;
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <h5 className="mb-2 text-sm font-extrabold text-slate-900">روش ارسال</h5>
            <div className="space-y-2 text-sm">
                <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-white">
                    <div className="flex items-center gap-2">
                        <input type="radio" name="shipping" checked={value === "standard"} onChange={() => onChange("standard")} />
                        <span className="text-slate-700">پست سفارشی (رایگان)</span>
                    </div>
                    <span className="text-slate-500">۲–۴ روز</span>
                </label>
                <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-white">
                    <div className="flex items-center gap-2">
                        <input type="radio" name="shipping" checked={value === "express"} onChange={() => onChange("express")} />
                        <span className="text-slate-700">اکسپرس</span>
                    </div>
                    <span className="text-slate-500">{new Intl.NumberFormat("fa-IR").format(45000)} تومان</span>
                </label>
            </div>
        </div>
    );
}

function Row({ label, value, muted }: { label: React.ReactNode; value: React.ReactNode; muted?: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <span className={`text-slate-600 ${muted ? "opacity-60" : ""}`}>{label}</span>
            <span className="text-slate-900">{value}</span>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14h9.69c.75 0 1.41-.41 1.75-1.03l3.24-5.88a1 1 0 00-.88-1.48H6.21L5.27 3.57A1 1 0 004.34 3H2v2h1.56l3.6 7.59L6.25 15c-.41.74.12 1.64.97 1.64H20v-2H7.42l-.26-.64z" fill="currentColor" /></svg>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">سبد خرید شما خالی است</h3>
            <p className="mt-1 text-sm text-slate-500">برای شروع خرید، به فروشگاه سر بزنید.</p>
            <a href="/products" className="mt-4 inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-2 text-sm font-extrabold text-white shadow hover:bg-blue-700">رفتن به فروشگاه</a>
        </div>
    );
}

