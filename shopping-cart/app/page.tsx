'use client'
import { useProductStore } from "./store/useProductStore"
// import { products } from "@/app/data/db-dumy"
import Drawer from "./components/ui/drawer"
import { useState ,useEffect} from "react"
import Heder from "@/app/components/ui/header"
import Cart from "@/app/components/minicard/cart"
import ProductList from '@/app/components/products/productList'


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
        
   <main className='container mx-auto md:w-10/12 py-8 px-4'>
    {isLoading 
      ? <div className='text-center text-lg'>Loading...</div> 
      : <ProductList products={products} />
    }
   </main>

    </>)

}
