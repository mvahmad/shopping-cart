interface StatCardProps {
    title: string;
    value: string;
    caption?: string;
    accent?: "green" | "blue" | "orange" | "red";
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    caption,
    accent = "blue",
}) => {
    const accentColor: Record<NonNullable<StatCardProps["accent"]>, string> = {
        green: "text-emerald-500",
        blue: "text-blue-500",
        orange: "text-orange-500",
        red: "text-red-500",
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm px-4 sm:px-5 py-3 sm:py-4 flex flex-col gap-1">
            <span className="text-[11px] sm:text-xs text-slate-500">{title}</span>
            <span className={`text-base sm:text-lg font-semibold ${accentColor[accent]}`}>
                {value}
            </span>
            {caption && (
                <span className="text-[11px] sm:text-xs text-slate-400">{caption}</span>
            )}
        </div>
    );
};

export default StatCard