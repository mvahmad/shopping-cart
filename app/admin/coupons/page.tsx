import Card from "../components/card";

const CouponsSection: React.FC = () => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h1 className="text-sm sm:text-base font-semibold">کدهای تخفیف</h1>
            <button className="text-[11px] sm:text-xs bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-xl shadow-sm hover:bg-emerald-600">
                + افزودن کد جدید
            </button>
        </div>

        <Card>
            <div className="overflow-x-auto">
                <table className="w-full text-[11px] sm:text-xs text-slate-600">
                    <thead className="border-b bg-slate-50">
                        <tr className="[&>th]:py-2 [&>th]:px-2 [&>th]:text-right">
                            <th>کد</th>
                            <th>نوع تخفیف</th>
                            <th>مقدار</th>
                            <th>حداقل خرید</th>
                            <th>تعداد استفاده</th>
                            <th>وضعیت</th>
                        </tr>
                    </thead>
                    <tbody className="[&>tr]:border-b">
                        <tr className="[&>td]:py-2 [&>td]:px-2">
                            <td>BARCA10</td>
                            <td>درصدی</td>
                            <td>۱۰٪</td>
                            <td>۵۰۰,۰۰۰ تومان</td>
                            <td>۲۳ / ۵۰</td>
                            <td>
                                <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-500 text-[10px]">
                                    فعال
                                </span>
                            </td>
                        </tr>
                        <tr className="[&>td]:py-2 [&>td]:px-2">
                            <td>BLACKFRIDAY</td>
                            <td>مبلغ ثابت</td>
                            <td>۲۰۰,۰۰۰ تومان</td>
                            <td>۱,۰۰۰,۰۰۰ تومان</td>
                            <td>۱۰۰ / ۱۰۰</td>
                            <td>
                                <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-400 text-[10px]">
                                    منقضی شده
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);
export default CouponsSection;