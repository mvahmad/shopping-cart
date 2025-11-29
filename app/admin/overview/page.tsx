import Card from "../components/card";
import StatCard from "../components/statCard";

const OverviewSection: React.FC = () => {
    return (
        <div className="space-y-4 sm:space-y-5">
            {/* کارت‌های بالا */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                <StatCard title="تعداد کاربران" value="۳۴۵ نفر" accent="blue" />
                <StatCard title="فروش روزانه" value="۱,۲۵۶,۰۰۰ تومان" accent="green" />
                <StatCard title="سود روزانه" value="۸۵۶,۰۰۰ تومان" accent="green" />
                <StatCard
                    title="فروش ماهانه"
                    value="۸۵,۶۰۰,۰۰۰ تومان"
                    accent="orange"
                />
            </div>

            {/* نمودار فروش (placeholder) */}
            <Card title="نمودار فروش کیت‌ها">
                <div className="h-56 sm:h-72 flex items-center justify-center border border-dashed border-slate-200 rounded-xl">
                    <span className="text-[11px] sm:text-xs text-slate-400">
                        اینجا بعداً نمودار واقعی (Chart.js / Recharts) قرار میدیم
                        به کمک آقا احمد گل.
                    </span>
                </div>
            </Card>

            {/* پرفروش‌ها + رو به اتمام‌ها */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <Card title="پرفروش‌ترین کیت‌ها">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[11px] sm:text-xs text-slate-600">
                            <thead className="border-b">
                                <tr className="[&>th]:py-2 [&>th]:text-right">
                                    <th>نام کیت</th>
                                    <th>لیگ</th>
                                    <th>تیم</th>
                                    <th>فروش ماهانه</th>
                                </tr>
                            </thead>
                            <tbody className="[&>tr]:border-b">
                                <tr className="[&>td]:py-2">
                                    <td>کیت اول بارسلونا ۲۴-۲۰۲۳</td>
                                    <td>لالیگا</td>
                                    <td>بارسلونا</td>
                                    <td>۲۳۸ عدد</td>
                                </tr>
                                <tr className="[&>td]:py-2">
                                    <td>کیت خانگی رئال مادرید</td>
                                    <td>لالیگا</td>
                                    <td>رئال مادرید</td>
                                    <td>۱۹۴ عدد</td>
                                </tr>
                                <tr className="[&>td]:py-2">
                                    <td>کیت لیورپول ۲۴-۲۰۲۳</td>
                                    <td>پریمیرلیگ</td>
                                    <td>لیورپول</td>
                                    <td>۱۷۸ عدد</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card title="کیت‌های رو به اتمام">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[11px] sm:text-xs text-slate-600">
                            <thead className="border-b">
                                <tr className="[&>th]:py-2 [&>th]:text-right">
                                    <th>نام محصول</th>
                                    <th>لیگ</th>
                                    <th>موجودی</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="[&>tr]:border-b">
                                <tr className="[&>td]:py-2">
                                    <td>کیت دوم منچسترسیتی</td>
                                    <td>پریمیرلیگ</td>
                                    <td className="text-red-500 font-semibold">۵ عدد</td>
                                    <td>
                                        <span className="px-2 py-1 rounded-full bg-red-50 text-red-500 text-[10px]">
                                            نیاز به شارژ
                                        </span>
                                    </td>
                                </tr>
                                <tr className="[&>td]:py-2">
                                    <td>کیت یوونتوس راه‌راه</td>
                                    <td>سری A</td>
                                    <td className="text-orange-500 font-semibold">۹ عدد</td>
                                    <td>
                                        <span className="px-2 py-1 rounded-full bg-orange-50 text-orange-500 text-[10px]">
                                            رو به اتمام
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};
export default OverviewSection