interface Props { 
    value: string;
    onChange: (v: string) => void;
    helper?: string 
}
export default function CouponCard({ value, onChange, helper }:Props ) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="کد تخفیف"
                    className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:bg-white"
                />
                <span className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">اعمال</span>
            </div>
            {helper && <p className="mt-2 text-xs text-slate-400">{helper}</p>}
        </div>
    );
}