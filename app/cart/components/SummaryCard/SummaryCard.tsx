"use client"
import Link from "next/link";
import Row from "../Row/Row";
interface Props {
    subtotal: number;
    discount: number;
    shippingCost: number;
    total: number;
    link:string
}
const toman = (v: number) => new Intl.NumberFormat("fa-IR").format(v) + " تومان";

export default function SummaryCard({
    subtotal,
    discount,
    shippingCost,
    total,
    link
}: Props) {

    const handleSubmit = ()=>{
        localStorage.setItem("subtotal",subtotal as unknown as string)
        localStorage.setItem("discount",discount as unknown as string)
        localStorage.setItem("shippingCost",shippingCost as unknown as string)
        localStorage.setItem("total",total as unknown as string)
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h4 className="mb-4 text-lg font-extrabold text-slate-900">خلاصه سفارش</h4>
            <div className="space-y-2 text-sm">
                <Row label="جمع جزء" value={toman(subtotal)} />
                <Row label="تخفیف" value={discount ? `− ${toman(discount)}` : toman(0)} muted={!discount} />
                <Row label="ارسال" value={shippingCost ? toman(shippingCost) : "رایگان"} />
            </div>
            <div className="my-3 h-px bg-slate-100" />
            <Row label={<span className="font-extrabold">مبلغ قابل پرداخت</span>} value={<span className="font-extrabold">{toman(total)}</span>} />
             <Link href={link}>
                <button
                    onClick={handleSubmit}
                    className="mt-4 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow hover:bg-blue-700"
                >
                    ادامه  
                </button>
            </Link> 
            <p className="mt-2 text-center text-xs text-slate-500">پرداخت امن • بازگشت وجه تا ۷ روز</p>
        </div>
    );
}