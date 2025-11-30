import Card from "../components/card";

const CustomersSection: React.FC = () => (
    <div className="space-y-4">
        <h1 className="text-sm sm:text-base font-semibold">مشتریان</h1>
        <Card>
            <div className="overflow-x-auto">
                <table className="w-full text-[11px] sm:text-xs text-slate-600">
                    <thead className="border-b bg-slate-50">
                        <tr className="[&>th]:py-2 [&>th]:px-2 [&>th]:text-right">
                            <th>نام</th>
                            <th>ایمیل</th>
                            <th>تعداد سفارش</th>
                            <th>مجموع خرید</th>
                            <th>آخرین خرید</th>
                        </tr>
                    </thead>
                    <tbody className="[&>tr]:border-b">
                        <tr className="[&>td]:py-2 [&>td]:px-2">
                            <td>محمد رضایی</td>
                            <td>m.rezaei@example.com</td>
                            <td>۱۲</td>
                            <td>۱۲,۸۰۰,۰۰۰ تومان</td>
                            <td>۱۴۰۲/۰۹/۰۳</td>
                        </tr>
                        <tr className="[&>td]:py-2 [&>td]:px-2">
                            <td>سارا احمدی</td>
                            <td>s.ahmadi@example.com</td>
                            <td>۶</td>
                            <td>۵,۲۰۰,۰۰۰ تومان</td>
                            <td>۱۴۰۲/۰۹/۰۲</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);

export default CustomersSection;