'use client'
import { useProductStore } from "./store/useProductStore"
import banner from '@/public/banner3.jpg'
import Drawer from "./components/ui/drawer"
import { useState ,useEffect} from "react"
import Heder from "@/app/components/ui/header"
import Cart from "@/app/components/minicard/cart"
import ProductList from '@/app/components/products/productList'
import Footer from "./components/ui/footer"
import Image from "next/image"
import {Skeleton} from "@nextui-org/react";
// Import Swiper React components
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HomePageAccordion from "./components/ui/homePageAccordion"



export default function Home () {
    const [isDerawOpen , setIsDrawOpen]  = useState<boolean>(false)
    const { products, isLoading, error, fetchData } = useProductStore()

    useEffect(() => { fetchData() }, [fetchData])

    return (
    <>
    <Heder onCartOnClick={()=> setIsDrawOpen(!isDerawOpen)}   />
    <Drawer isOpen={isDerawOpen} onCartIconClick={()=> setIsDrawOpen(!isDerawOpen)}>
      <Cart />
   </Drawer>
        
   <main className='[Home] container flex flex-col items-center mx-auto md:w-10/12 py-8 px-4'>
    <Image src={banner} alt ={'banner'} className="md:h-[18rem] h-full w-full object-cover " />

    <div className="md:text-2xl text-large font-bold pt-7">Easy shopping in different categories</div>
    <section className="[swiper] flex items-center justify-center w-[10rem] lg:w-[70rem]  md:w-[50rem] h-[12rem] px-[10px] tablet:px-[50px]">
    <Swiper
     modules={[Navigation, Pagination, A11y, Autoplay]}
     slidesPerView={3}
     pagination={{ clickable: true }}
     scrollbar={{ draggable: true }}
     autoplay={{
       delay: 5000,
       disableOnInteraction: false,
     }}
     spaceBetween={10}
     breakpoints={{
       900: {
         slidesPerView: 3,
       },
       640: {
         slidesPerView: 2,
       },
       0: {
         slidesPerView: 1,
       },
     }}
    >
      <SwiperSlide key={1}>
        <div className="bg-red-400 h-24"> slided 1 </div>
      </SwiperSlide>
      <SwiperSlide key={2}><div className="bg-red-600 h-24"> slided 1 </div></SwiperSlide>
      <SwiperSlide key={3}><div className="bg-red-800 h-24"> slided 1 </div></SwiperSlide>
      <SwiperSlide key={4}><div className="bg-red-900 h-24"> slided 1 </div></SwiperSlide>

    </Swiper>
    </section>

  

    <section className="p-2 m-2">
      <Skeleton  className="flex rounded-full w-12 h-12" />
      {isLoading 
          ? <div className='text-center text-lg'>Loading...</div> 
          : <ProductList products={products} />
        }
    </section>
    <HomePageAccordion />
   
   </main>
   <Footer />

    </>)

}
