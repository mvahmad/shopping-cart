import { useCartStore } from "@/app/store/useCartStore";
import { Product } from "@/app/types";
import { FaTrashAlt } from "react-icons/fa"
// import Image from "next/image"
export interface Props {
   product :Product
  }

function CartItem({product}:Props) {

    // Recover the store action to remove items from the cart
 const removeFromCart = useCartStore(state => state.removeFromCard)

 return (
   <li className='flex justify-between items-center gap-4  mb-2 shadow-md p-4'>
   <div className='flex items-center'>
      <img
         src={product.thumbnail}
         alt={product.title}
         width={100}
         height={100}
         className='h-10 w-10 rounded-full mr-4'
      />
      <div className='flex flex-col'>
         <span className='font-bold flex-1'>{product.title}</span>
         <span className='text-gray-600 font-bold'>${product.price}</span>
         <span>Quantity: {product.quantity}</span>
      </div>
   </div>
   <div>
      <button
         title='Remove Item'
         className='text-red-500 hover:text-red-600 ml-4'
         onClick={() => removeFromCart(product)}
      >
         <FaTrashAlt size={18} />
      </button>
   </div>
</li>
 )

 }
 
 export default CartItem;