import Card from "../components/card";

const InventorySection: React.FC = () => {
    const items = [
        { name: "کیت اول بارسلونا ۲۴-۲۰۲۳", stock: 35, min: 20 },
        { name: "کیت خانگی رئال مادرید", stock: 60, min: 30 },
        { name: "کیت دوم منچسترسیتی", stock: 5, min: 15 },
    ];

    return (
        <div className="space-y-4">
            <h1 className="text-sm sm:text-base font-semibold">مدیریت موجودی</h1>
            <Card>
                <div className="space-y-4 text-[11px] sm:text-xs">
                    {items.map((item) => {
                        const percent = Math.min(100, (item.stock / (item.min * 2)) * 100);
                        const color =
                            item.stock <= item.min
                                ? "bg-red-500"
                                : item.stock <= item.min * 1.5
                                    ? "bg-orange-400"
                                    : "bg-emerald-500";

                        return (
                            <div key={item.name} className="space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                    <span>{item.name}</span>
                                    <span className="text-slate-400">
                                        موجودی: {item.stock} / حداقل: {item.min}
                                    </span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                    <div
                                        className={`h-full ${color}`}
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
};
export default InventorySection