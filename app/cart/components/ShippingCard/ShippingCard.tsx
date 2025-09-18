interface Props {
    value: "standard" | "express";
    onChange: (v: "standard" | "express") => void;
}
export default function ShippingCard({value,onChange}:Props) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <h5 className="mb-2 text-sm font-extrabold text-slate-900">روش ارسال</h5>
            <div className="space-y-2 text-sm">
                <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-white">
                    <div className="flex items-center gap-2">
                        <input type="radio" name="shipping" checked={value === "standard"} onChange={() => onChange("standard")} />
                        <span className="text-slate-700">پست سفارشی (رایگان)</span>
                    </div>
                    <span className="text-slate-500">۲–۴ روز</span>
                </label>
                <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-white">
                    <div className="flex items-center gap-2">
                        <input type="radio" name="shipping" checked={value === "express"} onChange={() => onChange("express")} />
                        <span className="text-slate-700">اکسپرس</span>
                    </div>
                    <span className="text-slate-500">{new Intl.NumberFormat("fa-IR").format(45000)} تومان</span>
                </label>
            </div>
        </div>
    );
}
