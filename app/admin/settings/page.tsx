import Card from "../components/card";

const SettingsSection: React.FC = () => (
    <div className="space-y-4 max-w-xl">
        <h1 className="text-sm sm:text-base font-semibold">تنظیمات فروشگاه</h1>
        <Card>
            <form className="space-y-4 text-[11px] sm:text-xs">
                <div className="space-y-1">
                    <label className="block text-slate-600">نام فروشگاه</label>
                    <input
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        defaultValue="فروشگاه آنلاین کیت ورزشی"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-slate-600">ایمیل مدیریت</label>
                    <input
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        defaultValue="info@example.com"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-slate-600">روش‌های ارسال</label>
                    <textarea
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 min-h-[80px] focus:outline-none focus:ring-1 focus:ring-blue-400"
                        defaultValue="پست پیشتاز، پیک تهران، تحویل حضوری"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-slate-600">درگاه‌های پرداخت</label>
                    <input
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        defaultValue="زرین‌پال، ملت"
                    />
                </div>

                <button
                    type="button"
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl text-[11px] sm:text-xs hover:bg-blue-600"
                >
                    ذخیره تغییرات
                </button>
            </form>
        </Card>
    </div>
);
export default SettingsSection;