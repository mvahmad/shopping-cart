'use client'
// import { useState, useEffect } from "react"
import Header from "./components/ui/header"
import Footer from "./components/ui/footer"
import AboutSection from "./components/about/about"
import CategoryCard from "./components/ui/categoryCard"
import ProductsSlider from "./components/ui/ProductsSlider"
import HeroCarousel, { HeroSlide } from "./components/ui/HeroCarousel"
import ReviewCarousel, { type Review } from "./components/ui/Reviews"
import { getProducts } from "./hooks/queryHooks/products"
import { useGetServices } from "./hooks/useGetServices"
import { CategoriesResponse, getProductsResponse } from "./types"
import { getCategories } from "./hooks/queryHooks/getCategoris"



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
    //get categoris 
    const { data } = useGetServices<CategoriesResponse>({
        queryKey: ["GetCategoriesHomepage"],
        queryFn: getCategories,
    });
    const categories = data?.data.categories;
    const { data: firstCategoryData, isLoading } =
        useGetServices<getProductsResponse>({
        queryKey: ["GetFirstCategoryBooks", categories],
        queryFn: () => getProducts({ limit: "6", category: categories?.[1]._id }),
        });

    const { data: secondCategoryData, isLoading: secondCategoryIsLoading } =
    useGetServices<getProductsResponse>({
      queryKey: ["GetSecondCategoryBooks", categories],
      queryFn: () => getProducts({ limit: "6", category: categories?.[0]._id }),
    });    

    const firstCategoryItems = firstCategoryData?.data?.products || [];
    const secondCategoryItems = secondCategoryData?.data?.products || [];
    
    return (
        <>
            <Header />
            <main className='[Elite-Sport-Home] w-full bg-white'>
                <HeroCarousel slides={heroSlides} autoPlayMs={5000} />
                <CategoryCard />
                <AboutSection />
                <ProductsSlider 
                    bg={"bg-white"}
                    title ={ "پیشنهاد ویژه"}
                    isLoading={isLoading} 
                    products={firstCategoryItems} 
                    text={"slate-700"}
                />
                <ProductsSlider 
                    bg={"bg-blue-700"}
                    title ={ "محبوب‌ترین‌ها"}
                    isLoading={secondCategoryIsLoading} 
                    products={secondCategoryItems} 
                    text={"white"}
                />
                
                <ReviewCarousel items={demo} />
            </main>
            <Footer />
        </>)
}