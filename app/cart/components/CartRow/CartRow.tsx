import { CartItem, getUnitPrice } from "@/app/store/cartUtils";

interface Props {
    it: CartItem;
    onQty: (id: string, next: number) => void;
    onRemove: (id: string) => void;
}
const toman = (v: number) => new Intl.NumberFormat("fa-IR").format(v) + " تومان";

export default  function CartRow ({it,onQty,onRemove,} : Props){
    const unitPrice = getUnitPrice(it);
    const atMax = typeof it.stock === "number" && it.quantity >= it.stock;

    return (
        <div className="flex flex-col gap-4 p-4 sm:p-5 md:p-6 md:flex-row md:items-center">
            {/* Image */}
            <div className="relative h-28 w-full overflow-hidden rounded-2xl ring-1 ring-slate-100 sm:w-40">
                <img
                src={it.images?.[0] || it.thumbnail}
                alt={it.name}
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
                            disabled={it.quantity <= 1}
                            className="grid h-8 w-8 place-items-center text-slate-700 hover:bg-white rounded-lg disabled:opacity-40"
                        >
                            −
                        </button>
                        <input
                            type="number"
                            value={it.quantity}
                            onChange={(e) => {
                                const next = e.target.valueAsNumber;
                                if (Number.isFinite(next)) onQty(it._id, next);
                            }}
                            className="h-8 w-12 bg-transparent text-center text-sm font-bold outline-none text-slate-600"
                            min={1}
                            max={it.stock}
                        />
                        <button
                            onClick={() => onQty(it._id, it.quantity + 1)}
                            disabled={atMax}
                            className="grid h-8 w-8 place-items-center text-slate-700 hover:bg-white rounded-lg disabled:opacity-40"
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
                <span className="text-base md:text-lg font-extrabold text-slate-900">{toman(unitPrice * it.quantity)}</span>
                <span className="text-xs text-slate-400">{toman(unitPrice)} / عدد</span>
            </div>
        </div>
    );
}
