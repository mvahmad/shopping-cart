import { ProductsEntity } from "@/app/types";

interface Props {
    it: ProductsEntity;
    onQty: (id: string, next: number) => void;
    onRemove: (id: string) => void;
}
const toman = (v: number) => new Intl.NumberFormat("fa-IR").format(v) + " تومان";

export default  function CartRow ({it,onQty,onRemove,} : Props){
    let productsEntity!: ProductsEntity;
    if(it)productsEntity = it
    
    return (
        <div className="flex flex-col gap-4 p-4 sm:p-5 md:p-6 md:flex-row md:items-center">
            {/* Image */}
            <div className="relative h-28 w-full overflow-hidden rounded-2xl ring-1 ring-slate-100 sm:w-40">
                <img
                src={`http://${productsEntity?.images?.[0]}`}
                alt={it.name}
                fill-sizes="(min-width: 640px) 10rem, 100vw"
                className="object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-1">
                    <h3 className="truncate text-base md:text-lg font-bold text-slate-900">{it.name}</h3>
                </div>
                <div className="mt-3 flex items-center gap-4">
                    {/* Qty */}
                    <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-1">
                        <button
                            onClick={() => onQty(it._id, it.quantity - 1)}
                            className="grid h-8 w-8 place-items-center text-slate-700 hover:bg-white rounded-lg"
                        >
                            −
                        </button>
                        <input
                            type="number"
                            value={it.quantity}
                            onChange={(e) => onQty(it._id, Number(e.target.value))}
                            className="h-8 w-12 bg-transparent text-center text-sm font-bold outline-none text-slate-600"
                            min={1}
                            // 
                        />
                        <button
                            onClick={() => onQty(it._id, it.quantity + 1)}
                            className="grid h-8 w-8 place-items-center text-slate-700 hover:bg-white rounded-lg"
                        >
                            +
                        </button>
                    </div>

                    {/* Remove */}
                    <button
                        onClick={() => onRemove(it._id)}
                        className="text-xs font-bold text-rose-600 hover:underline"
                    >
                        حذف
                    </button>
                </div>
            </div>

            {/* Price */}
            <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-base md:text-lg font-extrabold text-slate-900">{toman(it.price * it.quantity)}</span>
                <span className="text-xs text-slate-400">{toman(it.price)} / عدد</span>
            </div>
        </div>
    );
}