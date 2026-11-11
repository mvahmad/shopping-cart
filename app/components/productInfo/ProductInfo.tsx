"use client"
import { toast } from "react-toastify";
import { ProductsEntity } from "@/app/types"
import { Button } from "@nextui-org/react"
import { useMemo, useState } from "react"
import { useCartStore } from "@/app/store/useCartStore"
import { getUnitPrice, quantityInCart } from "@/app/store/cartUtils"
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Cookies from "js-cookie";

const toman = (v: number) => new Intl.NumberFormat("fa-IR").format(v);

/**
 * Descriptions are stored as TipTap JSON, but older / hand-entered products may
 * contain plain text or malformed JSON. Never let that crash the product page.
 */
const ProductDescription = ({ description }: { description?: string }) => {
  const html = useMemo(() => {
    if (!description) return null;
    try {
      return generateHTML(JSON.parse(description), [StarterKit]);
    } catch {
      return null;
    }
  }, [description]);

  if (!description) return null;
  if (html === null) return <p className="whitespace-pre-line">{description}</p>;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default function ProductInfo({ product }: { product?: ProductsEntity }) {
  const [count, setCount] = useState<number>(0)
  const addToCart = useCartStore((state) => state.addToCart)
  const inCart = useCartStore((state) => (product ? quantityInCart(state.cart, product._id) : 0))
  const stock = product?.quantity ?? 0
  // Units that can still be added without exceeding the stock.
  const available = Math.max(stock - inCart, 0)

  const increase = () => setCount((prev) => (prev < available ? prev + 1 : prev))
  const decrease = () => setCount((prev) => (prev > 0 ? prev - 1 : prev))

  const handleAddToBasket = () => {
    if (!product || count <= 0) return
    if (!Cookies.get("accessToken")) {
      toast.warning("لطفا وارد حساب کاربری خود شوید")
      return
    }
    addToCart(product, Math.min(count, available))
    toast.success("محصول به سبد خرید اضافه شد");
    setCount(0) // Reset count after adding to cart
  }

  const finalPrice = product ? getUnitPrice(product) : 0
  const hasDiscount = !!product?.discount && product.discount > 0

  return (
    <section className="md:w-[400px] w-[300px] min-h-[430px] border-[1px] border-slate-200
    rounded-md flex flex-col px-[8px] py-[6px] justify-between shadow-sm">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-[24px] text-slate-500 gap-3 flex">
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
            {toman(finalPrice)} تومان
          </p>
          {hasDiscount && (
            <>
              <span className="text-sm text-slate-400 line-through">
                {toman(product!.price)}
              </span>
              <span className="min-w-[28px] h-[27px] px-1 text-white bg-red-500 rounded-md flex items-center justify-center">
                {product!.discount}%
              </span>
            </>
          )}
        </div>
        {product && available === 0 && (
          <p className="text-sm text-rose-600">
            {stock === 0 ? "این محصول موجود نیست" : "حداکثر موجودی این محصول در سبد خرید شماست"}
          </p>
        )}

        <div className="w-full flex gap-3 justify-end">
          <div className="rounded-md bg-slate-200 flex items-center justify-between w-[100px] font-bold p-2">
            <button onClick={increase} disabled={count >= available}>+</button>
            {count}
            <button onClick={decrease} disabled={count <= 0}>−</button>
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
