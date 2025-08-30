"use client";
import { useRef } from "react";
import ProductCard, { Product } from "./ProductCard";

export default function PopularProductsSlider({
    title = "محبوب‌ترین‌ها",
    products,
    hideRatings = false,
}: {
    title?: string;
    products: Product[];
    hideRatings?: boolean;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const scrollByAmount = (dir: "next" | "prev") => () => {
        const node = trackRef.current;
        if (!node) return;
        const amount = Math.round(node.clientWidth * 0.9);
        node.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
    };

    return (
        <div className="w-full py-8 bg-blue-700">
            <section dir="rtl" className="w-full px-4 md:px-8 max-w-7xl mx-auto py-8 bg-blue-700">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-extrabold text-white">{title}</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollByAmount("next")}
                            aria-label="بعدی"
                            className="grid h-10 w-10 place-items-center rounded-2xl border border-blue-300/50 bg-white/90 backdrop-blur text-blue-700 shadow hover:bg-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                        <button
                            onClick={scrollByAmount("prev")}
                            aria-label="قبلی"
                            className="grid h-10 w-10 place-items-center rounded-2xl border border-blue-300/50 bg-white/90 backdrop-blur text-blue-700 shadow hover:bg-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                    </div>
                </div>
                <div
                    ref={trackRef}
                    className="scrollbar-none relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 md:px-8"
                >
                    {products.map((p) => (
                        <ProductCard key={p.id} p={p} showRating={!hideRatings} />
                    ))}
                </div>
            </section>
        </div>
    );
}
