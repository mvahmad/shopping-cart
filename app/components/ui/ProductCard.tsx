// =====================
// ProductCard.tsx
// =====================
"use client";
import Cookies from "js-cookie";
import { ProductsEntity } from "@/app/types";
import Link from "next/link";
import { useCartStore } from "@/app/store/useCartStore";
import { toast } from "react-toastify";
// import { useState } from "react";

interface Props{ p: ProductsEntity; showRating?: boolean }

const toIRR = (n: number) =>
    new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(n);

export default function ProductCard({ p, showRating = true }: Props) {
    const rating = typeof p.rating.rate === "number" ? p.rating.rate : 0;
    const clamped = Math.max(0, Math.min(5, rating));
    const fillPercent = (clamped / 5) * 100;
    const addToCart = useCartStore((state) => state.addToCart) // Access the addToCard action from the store
    const accessToken = Cookies.get("accessToken")

    const handleAddToBasket = () => {
        accessToken ? 
        (addToCart(p,1) , toast.success("محصول به سبد خرید اضافه شد"))
         : toast.warning("لطفا وارد حساب کاربری خود شوید")
    }
    //set price after discount
    const newPrice = (Math.round( p.price * (p.discount / 10)))
    
    return (
        <div className="snap-start shrink-0 w-[12.5rem] md:w-[14rem] xl:w-[16rem]">
                <div className="relative rounded-lg border border-blue-100 bg-white/95 shadow-sm shadow-blue-100/60 hover:shadow-md hover:shadow-blue-200 transition-shadow">
                <Link href={`/product/${p._id}`} >
                    <div className="absolute inset-x-0 top-2 flex items-center justify-between px-3">
                        {typeof p.discount === "number" ? (
                            <div className="rounded-md bg-rose-500/95 px-3 py-1 text-xs font-bold text-white shadow-md">
                                {p.discount}%
                            </div>
                        ) : (<div></div>)}
                        {/*  */}
                    </div>
                    <div className="grid place-items-center px-6 pt-10 pb-4 border-b-2 border-b-gray-300">
                        <div className="relative h-48 w-40 md:h-52 md:w-44">
                            {p?.images?.map((image)=>{
                                return (
                                <img
                                key={image}
                                src={image}
                                alt={p.name}
                                sizes="(max-width: 768px) 10rem, (max-width: 1280px) 11rem, 12rem"
                                className="object-contain drop-shadow-sm"
                            />
                                )
                            })}
                        
                        </div>
                    </div>
                </Link>
                    
                    <div className="space-y-3 p-4">
                        <h3 className="line-clamp-2 text-center text-sm md:text-base font-semibold text-slate-800">
                            {p.name}
                        </h3>
                        <div className="flex items-center justify-between gap-3">
                            {showRating && (
                                <div className="flex items-center gap-1.5" aria-label={`امتیاز ${clamped} از 5`}>
                                    <div className="relative h-5 w-5">
                                        {/* base star */}
                                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-gray-300">
                                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.4 8.164L12 18.896l-7.334 3.864 1.4-8.164L.132 9.21l8.2-1.192L12 .587z" />
                                        </svg>
                                        {/* gold overlay clipped by rating percent */}
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="absolute inset-0 h-5 w-5 fill-yellow-400 transition-[clip-path] duration-200"
                                            style={{ clipPath: `inset(0 ${100 - fillPercent}% 0 0)` }}
                                        >
                                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.4 8.164L12 18.896l-7.334 3.864 1.4-8.164L.132 9.21l8.2-1.192L12 .587z" />
                                        </svg>
                                    </div>
                                    <span className="text-md font-medium text-slate-700">{clamped.toFixed(1)}</span>
                                    <span className="text-xs text-slate-500 xl:block hidden">{p.brand}({p.rating.rate} امتیاز)</span>
                                </div>
                            )}
                            <div className="flex items-center">
                                <div className="flex flex-col items-end justify-center ">
                                    {p.price && (
                                        <div className="text-xs text-slate-400 line-through">{toIRR(p.price)}</div>
                                    )}
                                    <div className="text-lg font-bold tracking-tight text-slate-900">
                                        {toIRR(newPrice)}
                                    </div>
                                </div>
                                <svg className="mr-2 h-full" width="15" height="33" viewBox="0 0 15 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 30.2062C7.58267 30.7289 8.52533 30.9902 9.328 30.9902C10.1773 30.9902 10.8213 30.7336 11.26 30.2202C11.6987 29.7069 11.918 28.9742 11.918 28.0222C11.918 27.3036 11.7873 26.6922 11.526 26.1882C11.274 25.6842 10.9427 25.3109 10.532 25.0682C10.1307 24.8162 9.706 24.6902 9.258 24.6902C8.85667 24.6902 8.32933 24.7742 7.676 24.9422C7.02267 25.1102 6.39733 25.2969 5.8 25.5022L5.226 24.3122C6.038 24.0322 6.77067 23.8269 7.424 23.6962C8.07733 23.5562 8.68867 23.4862 9.258 23.4862C9.97667 23.4862 10.658 23.6682 11.302 24.0322C11.946 24.3962 12.464 24.9236 12.856 25.6142C13.2573 26.2956 13.458 27.0982 13.458 28.0222C13.458 28.8996 13.2807 29.6556 12.926 30.2902C12.5807 30.9249 12.1093 31.4102 11.512 31.7462C10.9147 32.0729 10.2427 32.2362 9.496 32.2362C8.936 32.2362 8.33867 32.1429 7.704 31.9562C7.06933 31.7696 6.5 31.5502 5.996 31.2982L6.5 30.2062ZM5.366 28.8202C4.98333 28.4562 4.61933 28.0922 4.274 27.7282C4.61933 27.3642 4.98333 27.0002 5.366 26.6362L6.458 27.7282L5.366 28.8202ZM0.0459996 20.8918C0.577999 20.8172 1.42733 20.7565 2.594 20.7098C3.75133 20.6632 4.82933 20.6398 5.828 20.6398H6.444C7.004 20.6492 7.41933 20.6258 7.69 20.5698C7.96067 20.5138 8.15667 20.3878 8.278 20.1918C8.39933 19.9958 8.46 19.6832 8.46 19.2538V19.1838L9.23 19.0998L10 19.1838V19.2538C10 20.2432 9.74333 20.9385 9.23 21.3398C8.70733 21.7318 7.88133 21.9278 6.752 21.9278C5.72533 21.9278 4.55867 21.9558 3.252 22.0118C1.936 22.0585 0.965333 22.1285 0.339999 22.2218L0.0459996 20.8918ZM7.382 16.574C7.774 15.9954 8.082 15.4727 8.306 15.006C8.53 14.5394 8.642 14.18 8.642 13.928C8.642 13.8534 8.62333 13.7787 8.586 13.704C8.51133 13.564 8.39 13.4567 8.222 13.382C8.04467 13.3074 7.844 13.27 7.62 13.27C7.19067 13.27 6.79867 13.382 6.444 13.606C6.08933 13.83 5.912 14.1194 5.912 14.474C5.912 14.754 6.10333 15.0527 6.486 15.37C6.86867 15.678 7.45667 16.0187 8.25 16.392C8.82867 16.672 9.26733 17.0407 9.566 17.498C9.85533 17.9554 10 18.478 10 19.066V19.318L8.46 19.29V19.038C8.46 18.6647 8.35267 18.3194 8.138 18.002C7.92333 17.6847 7.59667 17.414 7.158 17.19C6.35533 16.7794 5.72067 16.364 5.254 15.944C4.78733 15.524 4.54 15.0667 4.512 14.572C4.484 14.0774 4.61467 13.648 4.904 13.284C5.19333 12.9107 5.576 12.626 6.052 12.43C6.528 12.234 7.02733 12.136 7.55 12.136C8.06333 12.136 8.53467 12.234 8.964 12.43C9.384 12.626 9.70133 12.9154 9.916 13.298C10.0187 13.4847 10.07 13.6994 10.07 13.942C10.07 14.6794 9.59867 15.7574 8.656 17.176L7.382 16.574ZM12.688 11.1441C12.3613 9.61346 11.9273 8.48879 11.386 7.77012C10.854 7.05146 10.182 6.69212 9.37 6.69212C8.838 6.69212 8.306 6.76212 7.774 6.90212C7.242 7.04212 6.79867 7.24746 6.444 7.51812C6.08 7.77946 5.87933 8.08746 5.842 8.44212C5.814 8.64746 5.884 8.84812 6.052 9.04412C6.21067 9.23079 6.42067 9.38479 6.682 9.50612C6.94333 9.61812 7.19533 9.67412 7.438 9.67412C7.634 9.67412 7.788 9.63679 7.9 9.56212C8.124 9.41279 8.27333 9.07212 8.348 8.54012C8.42267 7.99879 8.46 7.29879 8.46 6.44012V5.06812L9.23 4.98412L10 5.06812L10.014 6.79012C10.014 7.80746 9.93467 8.63346 9.776 9.26812C9.608 9.89346 9.26733 10.3321 8.754 10.5841C8.418 10.7428 8.04933 10.8221 7.648 10.8221C7.144 10.8221 6.64 10.7148 6.136 10.5001C5.632 10.2761 5.21667 9.98212 4.89 9.61812C4.56333 9.24479 4.4 8.84346 4.4 8.41412C4.4 7.86346 4.64267 7.37346 5.128 6.94412C5.604 6.50546 6.22 6.16946 6.976 5.93612C7.72267 5.69346 8.474 5.57212 9.23 5.57212C10.4433 5.57212 11.47 6.02479 12.31 6.93012C13.15 7.82612 13.7287 9.07679 14.046 10.6821L12.688 11.1441ZM8.46 5.24969V4.66169C8.46 3.68169 8.37133 2.99102 8.194 2.58969C8.00733 2.18835 7.718 1.98769 7.326 1.98769C7.06467 1.99702 6.64 2.09502 6.052 2.28169C5.464 2.46835 5.04867 2.62235 4.806 2.74369L4.176 1.58169C4.54933 1.39502 5.04867 1.21302 5.674 1.03569C6.29933 0.849021 6.84533 0.755687 7.312 0.755687C8.19867 0.755687 8.87067 1.06369 9.328 1.67969C9.776 2.29569 10 3.21969 10 4.45169V5.24969H8.46ZM2.048 4.59169C1.6 4.14369 1.376 3.91969 1.376 3.91969L2.384 2.89769C2.72933 3.23369 3.07 3.57435 3.406 3.91969L2.384 4.92769L2.048 4.59169ZM2.048 2.12769C1.6 1.67969 1.376 1.45569 1.376 1.45569L2.384 0.433687C2.72933 0.769687 3.07 1.11035 3.406 1.45569L2.384 2.46369L2.048 2.12769Z" fill="#1E293B" />
                                </svg>
                            </div>
                        </div>
                      
                        <div className="flex items-center gap-3 pt-2">
                            <button className="flex items-center justify-center flex-1 rounded-md border bg-blue-700 
                             px-4 py-2 text-sm font-semibold text-white shadow-sm"
                             onClick={handleAddToBasket}>
                                <div className="w-1/6 border-l-2 border-l-white hidden xl:block">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M16 10a4 4 0 0 1-8 0" /><path d="M3.103 6.034h17.794" /><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" /></svg>
                                </div>
                                <div className="w-5/6 sm:text-sm">
                                    <p className="lg:text-base text-xs">
                                        افزودن به سبد خرید
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            
        </div>
    );
}
