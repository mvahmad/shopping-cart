"use client";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Search, User, ChevronLeft, ShieldCheck, Truck, Sparkles, Star } from "lucide-react";
import { Vazirmatn } from "next/font/google";

const vazir = Vazirmatn({ subsets: ["arabic"], weight: ["400", "500", "700", "800"], variable: "--font-vazir" });

// --- Mock data ---
const categories = [
    { id: "national", label: "تیم‌های ملی", image: "/x.png" },
    { id: "clubs", label: "باشگاهی", image: "/x.png" },
    { id: "retro", label: "قدیمی/Retro", image: "/x.png" },
    { id: "kids", label: "بچگانه", image: "/x.png" },
];

const products = [
    { id: "arg10", name: "آرژانتین ۲۰۱۰ خانگی", price: 2790000, tag: "محبوب", image: "/x.png" },
    { id: "rm25", name: "رئال مادرید ۲۵/۲۴", price: 3290000, tag: "جدید", image: "/x.png" },
    { id: "bar14", name: "بارسلونا ۱۵/۱۴", price: 3090000, tag: "پرفروش", image: "/x.png" },
    { id: "br22", name: "برزیل تمرینی", price: 1890000, tag: "تخفیف", image: "/x.png" },
    { id: "psg20", name: "پاری‌سن‌ژرمن ۲۰/۲۱", price: 2950000, tag: "ویژه", image: "/x.png" },
    { id: "citypm", name: "من‌سیتی Warm‑Up", price: 1690000, tag: "سبک", image: "/x.png" },
];

export default function Home() {
    const [q, setQ] = useState("");
    const [cart, setCart] = useState<string[]>([]);

    const filtered = q
        ? products.filter(p => p.name.includes(q))
        : products;

    return (
        <main dir="rtl" className={`${vazir.variable} font-[family-name:var(--font-vazir)] bg-white text-slate-800 min-h-screen`}>
            {/* Header */}
            <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 grid place-items-center rounded-xl bg-blue-600 text-white shadow-sm">⚽</div>
                        <div className="text-xl sm:text-2xl font-extrabold tracking-tight">کیت‌اسپرت</div>
                    </div>
                    <div className="hidden md:flex items-center ms-auto w-full max-w-md rounded-2xl border bg-white px-3 py-2 shadow-sm">
                        <Search className="w-4 h-4 text-slate-500" />
                        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جستجو: تیم، سال، رنگ…" className="ms-2 w-full bg-transparent outline-none text-sm" />
                    </div>
                    <button className="relative ms-auto md:ms-3 inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-slate-50">
                        <User className="w-4 h-4" /> حساب کاربری
                    </button>
                    <button className="relative inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-slate-50">
                        <ShoppingCart className="w-4 h-4" /> سبد <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">{cart.length}</span>
                    </button>
                </div>
            </header>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                                با بهترین <span className="text-blue-700">کیت‌های فوتبالی</span> بدرخش!
                            </h1>
                            <p className="mt-4 text-slate-600 text-lg">ارسال سریع، کیفیت تضمینی و مجموعه‌ای کامل از تیم‌های محبوب ملی و باشگاهی.</p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 text-white px-5 py-3 shadow-md hover:bg-blue-700 transition">شروع خرید <ChevronLeft className="w-4 h-4" /></a>
                                <a className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 hover:bg-slate-50">محصولات جدید</a>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-6 text-slate-700">
                                <span className="inline-flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-blue-600" /> ضمانت اصالت</span>
                                <span className="inline-flex items-center gap-2"><Truck className="w-5 h-5 text-blue-600" /> ارسال سریع</span>
                                <span className="inline-flex items-center gap-2"><Sparkles className="w-5 h-5 text-blue-600" /> بسته‌بندی شیک</span>
                            </div>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image src="/m5.jpg" alt="hero" width={1200} height={900} className="h-[420px] w-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-4 right-4 text-white font-semibold bg-black/40 backdrop-blur px-3 py-1 rounded-xl">کالکشن ویژه تابستان</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-end justify-between">
                    <h2 className="text-2xl sm:text-3xl font-extrabold">دسته‌بندی‌ها</h2>
                    <a className="text-blue-700 hover:underline font-semibold">مشاهده همه</a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
                    {categories.map(c => (
                        <div key={c.id} className="rounded-[32px] bg-white shadow-md hover:shadow-2xl transition p-6 flex flex-col items-center text-center border border-slate-100 hover:-translate-y-1 duration-300">
                            <div className="w-28 h-28 rounded-full overflow-hidden shadow-md ring-4 ring-blue-100">
                                <Image alt={c.label} src={c.image} width={300} height={300} className="h-full w-full object-cover" />
                            </div>
                            <div className="mt-4 font-bold text-lg">{c.label}</div>
                            <p className="mt-1 text-slate-500 text-sm">کالکشن خاص</p>
                            <button className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-5 py-2 text-sm hover:bg-blue-700 transition">مشاهده</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Products */}
            <section className="bg-slate-50/60 border-y">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl sm:text-3xl font-extrabold">منتخب امروز</h2>
                        <div className="text-slate-600 text-sm">{filtered.length} کالا</div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filtered.map(p => (
                            <article key={p.id} className="group rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition">
                                <div className="relative">
                                    <Image src={p.image} alt={p.name} width={800} height={600} className="h-48 w-full object-cover" />
                                    <span className="absolute top-3 left-3 rounded-full bg-blue-600/90 text-white text-xs px-2 py-1">{p.tag}</span>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold line-clamp-1">{p.name}</h3>
                                    <div className="mt-1 flex items-center gap-1 text-amber-500"><Star className="w-4 h-4 fill-amber-500" /><span className="text-xs text-slate-500">4.8</span></div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="font-extrabold">{p.price.toLocaleString("fa-IR")} تومان</div>
                                        <button onClick={() => setCart(v => [...v, p.id])} className="inline-flex items-center gap-1 rounded-xl bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700"><ShoppingCart className="w-4 h-4" /> افزودن</button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white" />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
                    <h3 className="text-2xl sm:text-3xl font-extrabold">با خبرنامه کیت‌اسپرت، از تخفیف‌های ویژه جا نمونی!</h3>
                    <p className="mt-3 text-slate-600">هفته‌ای یک بار بهترین پیشنهادها و جدیدترین کیت‌ها رو برات می‌فرستیم.</p>
                    <form className="mt-6 mx-auto flex max-w-xl gap-2">
                        <input type="email" placeholder="ایمیل شما" className="flex-1 rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                        <button className="rounded-2xl bg-blue-600 text-white px-5 py-3 hover:bg-blue-700">عضویت</button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <div className="text-xl font-extrabold">کیت‌اسپرت</div>
                        <p className="mt-3 text-slate-600 text-sm">فروشگاه آنلاین کیت‌های فوتبالی با تضمین اصالت و ارسال سریع.</p>
                    </div>
                    <div>
                        <div className="font-bold">خرید</div>
                        <ul className="mt-3 space-y-2 text-slate-600 text-sm">
                            <li>باشگاهی</li>
                            <li>تیم‌های ملی</li>
                            <li>بچگانه</li>
                            <li>لوازم جانبی</li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-bold">خدمات</div>
                        <ul className="mt-3 space-y-2 text-slate-600 text-sm">
                            <li>راهنمای سایز</li>
                            <li>پرسونالایز نام و شماره</li>
                            <li>پیگیری سفارش</li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-bold">ارتباط با ما</div>
                        <ul className="mt-3 space-y-2 text-slate-600 text-sm">
                            <li>پشتیبانی: ۰۲۱‑۱۲۳۴۵۶۷۸</li>
                            <li>ایمیل: support@sportkit.ir</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} کیت‌اسپرت — همه حقوق محفوظ است.</div>
            </footer>
        </main>
    );
}
