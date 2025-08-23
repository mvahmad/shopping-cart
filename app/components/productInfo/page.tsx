"use client"
import { ProductsEntity } from "@/app/types";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function ProductInfo ({product}:{product:ProductsEntity}){
    let [count , setCount] = useState<number>(0)
    const productCount = product?.quantity
    const incrise = ()=> {
        if(productCount>=count){
            setCount(count += 1)
        }
    }
    const decrise = ()=>{
        if (count>0){
            setCount(count -=1) 
        }
    }
    return(
    <section 
        className=" md:w-[500px] w-[300px] md:h-[350px] h-[400px] 
        border-2 border-gray-500 rounded-md flex flex-col px-[8px] py-[6px] justify-between">
            <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-[24px] text-slate-700 gap-3 flex ">
                {product?.name} / <span>{product?.brand}</span>
            </h1>
            <p className="flex items-center">
                {product?.description}
            </p>
            </div>
          
          <div  className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                <span className="font-bold">قیمت:</span>
                <p className="font-bold text-[24px] text-[#059669]">{product?.price}تومان</p>
                <span className="w-[28px] h-[27px] text-white bg-red-500 rounded-md flex items-center">{product?.discount}%</span>
            </div>
            <div className="w-full flex gap-3 justify-end">
                  <div className="rounded-md bg-slate-300 flex items-center justify-between w-[100px] font-bold p-2">
                    <button onClick={incrise}>+</button>
                    {count}
                    <button onClick={decrise}>-</button>
                </div>
                <Button className="bg-blue-500 text-white w-full">افزودن به سبد خرید</Button>
            </div>

          </div>
          

    </section>
    )
}