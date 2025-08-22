import { ProductsEntity } from "@/app/types";

export default function ProductInfo ({product}:{product:ProductsEntity}){
    return(
    <section 
        className="sm:w-[612px] w-[500px] sm:h-[628px] h-[590px] 
        border-2 border-gray-500 rounded-md flex flex-col px-[8px] py-[6px] mt-8">
            <h1 className="font-bold text-[24px] text-slate-700 gap-3 flex ">
                {product?.name} / <span>{product?.brand}</span>
            </h1>
            <p>{product?.description}</p>
            <div className="flex gap-2 items-center">
                <p className="font-bold text-[24px] text-[#059669]">{product?.price}تومان</p>
                <span className="w-[28px] h-[27px] text-white bg-red-500 rounded-md flex items-center">{product?.discount}%</span>
            </div>
            

    </section>
    )
}