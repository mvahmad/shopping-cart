import Card from "../components/card";

const ReportsSection: React.FC = () => (
    <div className="space-y-4">
        <h1 className="text-sm sm:text-base font-semibold">گزارش‌ها</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            <Card title="گزارش فروش ماهانه">
                <p className="text-[11px] sm:text-xs text-slate-500">
                    محل قرار دادن نمودار.
                </p>
            </Card>
            <Card title="گزارش سود">
                <p className="text-[11px] sm:text-xs text-slate-500">
                    خلاصه سود ناخالص بر اساس بازه زمانی و کانال فروش.
                </p>
            </Card>
            <Card title="گزارش رفتار مشتریان">
                <p className="text-[11px] sm:text-xs text-slate-500">
                    مشتریان وفادار، میانگین سبد خرید، نرخ بازگشت مشتری و ...
                </p>
            </Card>
        </div>
    </div>
);
export default ReportsSection