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
    <section className="p-2 m-2">
      <Skeleton  className="flex rounded-full w-12 h-12" />
      {isLoading 
          ? <div className='text-center text-lg'>Loading...</div> 
          : <ProductList products={products} />
        }
    </section>
   </main>
   <Footer />

    </>)

}
