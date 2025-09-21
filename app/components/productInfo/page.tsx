"use client"
import { toast } from "react-toastify";
import { ProductsEntity } from "@/app/types"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import { useCartStore } from "@/app/store/useCartStore"

export default function ProductInfo({ product }: { product: ProductsEntity }) {
  const [count, setCount] = useState<number>(0)
  const addToCart = useCartStore((state) => state.addToCart) // Access the addToCard action from the store

  const maxStock = product?.quantity ?? 1 // fallback if quantity is undefined

  const increase = () => {
    if (count < maxStock) {
      setCount(prev => prev + 1)
    }
  }

  const decrease = () => {
    if (count > 0) {
      setCount(prev => prev - 1)
    }
  }

  const handleAddToBasket = () => {
    if (count > 0) {
        addToCart(product,count) // Adds the product `count` times
        toast.success("محصول به سبد خرید اضافه شد");
        setCount(0) // Reset count after adding to cart
    }
  }

  const ProductDescription = ({ description }: { description: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: description }} />
  }

  return (
    <section className="md:w-[400px] w-[300px] min-h-[430px] border-[1.4px] border-gray-500 rounded-md flex flex-col px-[8px] py-[6px] justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-[24px] text-slate-700 gap-3 flex">
          {product?.name} / <span>{product?.brand}</span>
        </h1>
        <div className="flex items-center">
          <ProductDescription description={product?.description} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <span className="font-bold">قیمت:</span>
          <p className="font-bold text-[24px] text-[#059669]">
            {product?.price} تومان
          </p>
          <span className="w-[28px] h-[27px] text-white bg-red-500 rounded-md flex items-center justify-center">
            {product?.discount}%
          </span>
        </div>

        <div className="w-full flex gap-3 justify-end">
          <div className="rounded-md bg-slate-200 flex items-center justify-between w-[100px] font-bold p-2">
            <button onClick={increase}>+</button>
            {count}
            <button onClick={decrease}>−</button>
          </div>

          <Button
            onPress={handleAddToBasket}
            className="bg-blue-500 text-white w-full"
            isDisabled={count <= 0}
          >
            افزودن به سبد خرید
          </Button>
        </div>
      </div>
    </section>
  )
}
