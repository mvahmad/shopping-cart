"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useMemo, useRef, useState } from "react";

export type Review = {
  id: string | number;
  author: string;
  avatar: string;
  date: string | Date;
  text: string;
  verified?: boolean;
};

type Props = {
  title?: string;
  items: Review[];
  autoplayDelay?: number; // ms, set 0 to disable
  maxWidthClass?: string;
};

export default function ReviewCarouselEmbla({
  title = "نظرات مشتریان",
  items,
  autoplayDelay = 3500,
  maxWidthClass = "max-w-7xl",
}: Props) {
  const ids = useMemo(() => items.map((s) => String(s.id)), [items]);

  // Embla options (RTL aware, center-active, infinite loop)
  const options: EmblaOptionsType = useMemo(
    () => ({ loop: true, align: "center", direction: "rtl" }),
    []
  );

  // Autoplay plugin instance (kept stable across renders)
  const autoplay = useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    autoplayDelay > 0 ? [autoplay.current] : []
  );

  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const fmt = (d: string | Date) =>
    new Date(d).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!items?.length) return null;

  return (
    <section dir="rtl" className="relative w-full py-12">
      <div className={`relative mx-auto ${maxWidthClass} px-4 md:px-8`}>
        {title && (
          <div className="w-full flex items-center justify-between">
            <h2 className="text-center text-2xl font-extrabold text-slate-900">
              {title}
            </h2>
            <button className="p-2 text-blue-700 border-2 border-blue-700 rounded-md">
              ثبت دیدگاه
            </button>
          </div>
        )}

        <div className="relative">
          {/* Prev */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="قبلی"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full border border-blue-300 bg-white/90 text-blue-700 shadow hover:bg-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path
                d="M15.5 19l-7-7 7-7"
                className="fill-none stroke-current"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Viewport */}
          <div className="overflow-hidden pt-12 pb-2" ref={emblaRef}>
            {/* Track */}
            <div className="flex -ml-4">
              {items.map((r, i) => {
                const active = i === selected; // center-active
                return (
                  <div
                    key={ids[i]}
                    className="pl-4 flex-[0_0_95%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  >
                    <div
                      className={`relative w-full h-[14rem] md:h-[16rem] rounded-3xl border border-blue-100 bg-white p-5 pt-12 shadow-sm shadow-blue-100/60 transition-all duration-500 ${active ? "scale-105 z-10" : "scale-90 opacity-70"
                        }`}
                    >
                      {/* avatar on top edge, centered */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-blue-200">
                          <Image
                            src={r.avatar}
                            alt={r.author}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* author + verified */}
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold text-slate-900">{r.author}</h3>
                          {r.verified && (
                            <div className="relative group">
                              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-white">
                                <svg viewBox="0 0 24 24" className="h-3 w-3">
                                  <path
                                    fill="currentColor"
                                    d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z"
                                  />
                                </svg>
                              </span>
                              <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white shadow">
                                خریدار تایید شده
                              </div>
                            </div>
                          )}
                        </div>
                        <time
                          className="mt-1 text-xs text-slate-500"
                          dateTime={new Date(r.date).toISOString()}
                        >
                          {fmt(r.date)}
                        </time>
                      </div>

                      <blockquote className="mt-4 text-center text-slate-700 leading-7 line-clamp-6">
                        {r.text}
                      </blockquote>

                      {/* active indicator */}
                      {active && (
                        <div className="mx-auto mt-3 h-1.5 w-12 rounded bg-blue-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="بعدی"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full border border-blue-300 bg-white/90 text-blue-700 shadow hover:bg-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path
                d="M8.5 5l7 7-7 7"
                className="fill-none stroke-current"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// Usage:
// import ReviewCarouselEmbla, { type Review } from "@/components/ReviewCarouselEmbla";
// const demo: Review[] = [
//   { id: 1, author: "پارسا", avatar: "/avatars/1.jpg", date: "2025-08-01", text: "کیت رئال 24/25 عالی بود، دوخت تمیز و سبک!", verified: true },
//   { id: 2, author: "ملیکا", avatar: "/avatars/2.jpg", date: "2025-07-21", text: "ارسال سریع بود و سایزبندی دقیق. حتماً دوباره خرید می‌کنم." },
//   { id: 3, author: "کیان", avatar: "/avatars/3.jpg", date: "2025-07-10", text: "رنگ لباس بارسا دقیقاً مثل عکس‌ها بود، پارچه نفس‌کش!" },
//   { id: 4, author: "سروش", avatar: "/avatars/4.jpg", date: "2025-06-29", text: "تعویض سایز بدون دردسر انجام شد.", verified: true },
// ];
// <ReviewCarouselEmbla items={demo} autoplayDelay={3500} />