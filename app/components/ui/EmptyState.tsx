export default function EmptyState({ message }: { message: string }) {
    return (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3l3 2-1 3-2 1-2-1-1-3 3-2z" fill="currentColor" /></svg>
            </div>
            <p className="text-sm text-slate-500">{message}</p>
        </div>
    );
}