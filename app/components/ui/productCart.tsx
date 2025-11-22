import { ProductsEntity } from "@/app/types";
export default function ProductCard({ p }: { p: ProductsEntity}) {
    const price = p.discount && p.discount ? p.discount : p.price;
    const hasOff = p.discount && p.discount && p.discount < p.price;
    const fmt = (v: number) => new Intl.NumberFormat("fa-IR").format(v) + " تومان";
    return (
        <article className="group rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md">
            <div className="relative mb-3 aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-slate-100">
                 {p?.thumbnail &&
                  (<img
                    src={p.thumbnail}
                    alt={p.name}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />)
                    }
                </div> 
                
            <h3 className="line-clamp-1 text-sm font-bold text-slate-900">{p.name}</h3>
            <div className="mt-1 flex items-center gap-2">
                <span className="text-[13px] font-extrabold text-slate-900">{fmt(price)}</span>
                {hasOff && (
                    <span className="text-xs text-slate-400 line-through">{fmt(p.price)}</span>
                )}
            </div>
            <button className="mt-3 w-full rounded-xl bg-blue-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-blue-700">افزودن به سبد</button>
        </article>
    );
}