import { products } from "@/data/db-dummy"
import { useState } from "react"
import Heder from "../components/ui/header"
import Cart from "../components/minicard/cart"

export default function Home () {
    const [isDerawOpen , setIsDrawOpen]  = useState<boolean>(false)
    const HandelCartOnClick  = () => setIsDrawOpen(!isDerawOpen)

    return (
    <>
    <Heder onCartOnClick={HandelCartOnClick}   />
    <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
    <Cart />
   </Drawer>
   <main className='container mx-auto md:w-10/12 py-8 px-4'>
    <ProductList products={products} />
   </main>
    </>)

}