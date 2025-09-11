'use client'

import { useState, useEffect } from "react"
import Header from "./components/ui/header"
import Footer from "./components/ui/footer"
import AboutSection from "./components/about/about"
import CategoryCard from "./components/ui/categoryCard"
import PopularProductsSlider from "./components/ui/PopularProductsSlider"
import type { Product } from "./components/ui/ProductCard"
import SpecialOffersSlider from "./components/ui/SpecialOffersSlider"
import HeroCarousel, { HeroSlide } from "./components/ui/HeroCarousel"
import ReviewCarousel, { type Review } from "./components/ui/Reviews"


export const sampleProducts: Product[] = [
    {
        id: 1,
        title: "کیت اول بارسلونا ۲۳-۲۴ ",
        image: "/barcelona.png",
        price: 111200,
        oldPrice: 139000,
        rating: 4,
        reviewsCount: 55,
        isFavorite: true,
        discountPercent: 20,
    },
    {
        id: 2,
        title: "کیت اول آلمان ۲۰۲۴",
        image: "/barcelona.png",
        price: 98000,
        oldPrice: 122000,
        rating: 5,
        reviewsCount: 78,
        isFavorite: false,
        discountPercent: 15,
    },
    {
        id: 3,
        title: "کیت دوم بارسلونا ۲۳-۲۴",
        image: "/barcelona.png",
        price: 102000,
        oldPrice: 126000,
        rating: 3,
        reviewsCount: 41,
        isFavorite: false,
        discountPercent: 10,
    },
    {
        id: 4,
        title: "کیت اول رئال مادرید ۲۳-۲۴",
        image: "/barcelona.png",
        price: 119000,
        oldPrice: 145000,
        rating: 5,
        reviewsCount: 100,
        isFavorite: true,
        discountPercent: 18,
    },
    {
        id: 5,
        title: "کیت اول رئال مادرید ۲۳-۲۴",
        image: "/barcelona.png",
        price: 119000,
        oldPrice: 145000,
        rating: 5,
        reviewsCount: 100,
        isFavorite: true,
        discountPercent: 18,
    },
    {
        id: 6,
        title: "کیت اول رئال مادرید ۲۳-۲۴",
        image: "/barcelona.png",
        price: 119000,
        oldPrice: 145000,
        rating: 5,
        reviewsCount: 100,
        isFavorite: true,
    },
];

const heroSlides: HeroSlide[] = [
    { id: 1, image: "/Carousel1.png", title: "فروش ویژه پاییز", subtitle: "تخفیف تا ۴۰٪", ctaText: "مشاهده", ctaHref: "/products" },
    { id: 2, image: "/Carousel2.png", title: "محصولات جدید", subtitle: "۱۲ کیت کلاسیک جدید اضافه شد" },
    { id: 3, image: "/Carousel3.png", title: "پشتیبانی سریع", subtitle: "۷ روز هفته کنار شما هستیم" },
];


const demo: Review[] = [
    { id: 1, author: "محمد سمیع عسکری", avatar: "/Avatar2.png", date: "2025-08-01", text: "کیت رئال 24/25 عالی بود، دوخت تمیز و سبک!", verified: true },
    { id: 2, author: "احمد موحدی", avatar: "/Avatar1.png", date: "2025-07-21", text: "ارسال سریع بود و سایزبندی دقیق. حتماً دوباره خرید می‌کنم." },
    { id: 3, author: "امیرحسین مسیحی", avatar: "/Avatar5.png", date: "2025-07-10", text: "رنگ لباس بارسا دقیقاً مثل عکس‌ها بود، پارچه نفس‌کش!" },
    { id: 4, author: "امید شنبه‌پور", avatar: "/Avatar3.png", date: "2025-07-10", text: "رنگ لباس بارسا دقیقاً مثل عکس‌ها بود، پارچه نفس‌کش!" },
    { id: 5, author: "آیین دهقانی", avatar: "/Avatar6.png", date: "2023-05-14", text: "رنگ لباس بارسا دقیقاً مثل عکس‌ها بود، پارچه نفس‌کش!" },
    { id: 6, author: "محمد حیدری‌زاده", avatar: "/Avatar7.png", date: "2025-08-01", text: "کیت رئال 24/25 عالی بود، دوخت تمیز و سبک!", verified: true },
    { id: 7, author: "علیرضا وثوق‌مهر", avatar: "/Avatar4.png", date: "2000-02-19", text: "رنگ لباس بارسا دقیقاً مثل عکس‌ها بود، پارچه نفس‌کش!" },
];

export default function Home() {
    return (
        <>
            <Header />
            <main className='[Elite-Sport-Home] w-full bg-white'>
                <HeroCarousel slides={heroSlides} autoPlayMs={5000} />
                <CategoryCard />
                <AboutSection />
                <SpecialOffersSlider products={sampleProducts} />
                <PopularProductsSlider products={sampleProducts} />
                <ReviewCarousel items={demo} />
            </main>
            <Footer />

        </>)
}
