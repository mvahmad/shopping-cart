export default function EmptyState() {
    return (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14h9.69c.75 0 1.41-.41 1.75-1.03l3.24-5.88a1 1 0 00-.88-1.48H6.21L5.27 3.57A1 1 0 004.34 3H2v2h1.56l3.6 7.59L6.25 15c-.41.74.12 1.64.97 1.64H20v-2H7.42l-.26-.64z" fill="currentColor" /></svg>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">سبد خرید شما خالی است</h3>
            <p className="mt-1 text-sm text-slate-500">برای شروع خرید، به فروشگاه سر بزنید.</p>
            <a href="/products" className="mt-4 inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-2 text-sm font-extrabold text-white shadow hover:bg-blue-700">رفتن به فروشگاه</a>
        </div>
    );
}
