'use client'
import { useCartStore } from "@/app/store/useCartStore";
import CartItem from "./cartItem";
import { useState ,useEffect } from "react";
import { Product } from "@/app/types";
import useFromStore from "@/app/hooks/useFromStore";
function Cart() {

    // Get the cart status using the hook useCartStore, which gives us access to the cart status of the store.
    const cart = useFromStore(useCartStore , state => state.cart )

   let total = 0
   if (cart) {
    total = cart.reduce((acc, product) => acc + product.price * (product.quantity as number), 0)
   }

   
    return (
    <>
        <section>
        <ul>
        {cart?.map(product => (
            <CartItem key={product.id} product={product} />
    ))}
   </ul>
        <div className='flex justify-between items-center mt-4'>
            <span className='text-lg font-bold'>Total:</span>
            <span className='text-xl font-bold'>${total.toFixed(2)}</span>
        </div>
        </section>
    </>
     );
}

export default Cart;