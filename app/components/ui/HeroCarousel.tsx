"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export type HeroSlide = {
    id: string | number;
    image: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaHref?: string;
};

type Props = {
    slides: HeroSlide[];
    autoPlayMs?: number;
};

export default function HeroCarousel({ slides, autoPlayMs = 4000 }: Props) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    const ids = useMemo(() => slides.map((s) => String(s.id)), [slides]);

    const goTo = (i: number) => {
        const node = trackRef.current;
        if (!node) return;
        const clamped = ((i % slides.length) + slides.length) % slides.length;
        const child = node.children[clamped] as HTMLElement | undefined;
        if (child) {
            const left = child.offsetLeft; // فقط اسکرول افقیِ کانتینر
            node.scrollTo({ left, behavior: "smooth" });
        }
        setIndex(clamped);
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    useEffect(() => {
        if (!autoPlayMs || slides.length <= 1) return;
        const t = setInterval(() => {
            next();
        }, autoPlayMs);
        return () => clearInterval(t);
    }, [autoPlayMs, slides.length, index]);

    if (!slides?.length) return null;

    return (
        <section dir="rtl" className="relative w-full overflow-hidden">
            {/* Slides */}
            <div
                ref={trackRef}
                className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-[40vh] md:h-[55vh] lg:h-[65vh]"
            >
                {slides.map((s, i) => (
                    <div key={ids[i]} className="relative snap-start shrink-0 w-full h-full">
                        <Image
                            src={s.image}
                            alt={s.title ?? `slide-${ids[i]}`}
                            fill
                            priority={i === 0}
                            sizes="100vw"
                            className="object-cover"
                        />
                        {/* overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                        {(s.title || s.subtitle || s.ctaText) && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white px-4 max-w-2xl">
                                {s.title && <h2 className="text-xl md:text-3xl font-extrabold drop-shadow-lg">{s.title}</h2>}
                                {s.subtitle && <p className="mt-2 text-sm md:text-lg opacity-90 drop-shadow">{s.subtitle}</p>}
                                {s.ctaText && s.ctaHref && (
                                    <a
                                        href={s.ctaHref}
                                        className="mt-4 inline-block rounded-xl bg-white/90 px-4 py-2 text-sm font-bold text-blue-700 shadow hover:bg-white transition"
                                    >
                                        {s.ctaText}
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        aria-label="قبلی"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 md:h-11 md:w-11 place-items-center rounded-full border border-blue-300/50 bg-white/90 text-blue-700 shadow hover:bg-white"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-6 md:w-6">
                            <path d="M15.5 19l-7-7 7-7" className="fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        aria-label="بعدی"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 md:h-11 md:w-11 place-items-center rounded-full border border-blue-300/50 bg-white/90 text-blue-700 shadow hover:bg-white"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-6 md:w-6">
                            <path d="M8.5 5l7 7-7 7" className="fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={ids[i]}
                            onClick={() => goTo(i)}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-white shadow" : "bg-white/60 hover:bg-white/80"
                                }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

// Usage Example:
// const slides: HeroSlide[] = [
//   { id: 1, image: "/banners/sale-1.jpg", title: "فروش ویژه", subtitle: "تخفیف تا ۴۰٪" },
//   { id: 2, image: "/banners/new.jpg", title: "محصولات جدید" },
//   { id: 3, image: "/banners/support.jpg", title: "پشتیبانی ۲۴/۷" },
// ];
// <HeroCarousel slides={slides} autoPlayMs={5000} />
