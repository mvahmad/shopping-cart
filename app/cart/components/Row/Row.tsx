export default function Row({ label, value, muted }: { label: React.ReactNode; value: React.ReactNode; muted?: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <span className={`text-slate-600 ${muted ? "opacity-60" : ""}`}>{label}</span>
            <span className="text-slate-900">{value}</span>
        </div>
    );
}