"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

// =============== Types ===============
export type ProductDemo = {
    id: string | number;
    title: string;
    teamId: string;
    price: number;
    image: string;
    hasDiscount?: boolean;
    discountPrice?: number;
};

export type Team = {
    id: string;
    name: string;
    leagueId: string;
};

export type League = {
    id: string;
    name: string;
};

type Props = {
    leagues: League[];
    teams: Team[];
    products: ProductDemo[];
    defaultLeagueId?: string; // پیش‌فرض انتخاب اولیه لیگ
    defaultTeamId?: string;   // پیش‌فرض انتخاب اولیه تیم (ترجیحاً داخل همان لیگ)
    pageSize?: number;        // تعداد آیتم در هر صفحه
};

// =============== Page ===============
export default function ProductsPageComponent({
    leagues,
    teams,
    products,
    defaultLeagueId,
    defaultTeamId,
    pageSize = 8,
}: Props) {
    // Ensure defaults exist
    const initialLeagueId = useMemo(() => defaultLeagueId ?? leagues[0]?.id ?? "", [defaultLeagueId, leagues]);
    const initialTeamId = useMemo(() => {
        if (defaultTeamId) return defaultTeamId;
        const firstTeam = teams.find((t) => t.leagueId === initialLeagueId);
        return firstTeam?.id ?? teams[0]?.id ?? "";
    }, [defaultTeamId, teams, initialLeagueId]);

    const [selectedLeagueId, setSelectedLeagueId] = useState(initialLeagueId);
    const [selectedTeamId, setSelectedTeamId] = useState(initialTeamId);
    const [page, setPage] = useState(1);

    // When league changes, reset team to first team of that league and page to 1
    useEffect(() => {
        const leagueTeams = teams.filter((t) => t.leagueId === selectedLeagueId);
        const hasCurrentTeam = leagueTeams.some((t) => t.id === selectedTeamId);
        if (!hasCurrentTeam) {
            setSelectedTeamId(leagueTeams[0]?.id ?? "");
        }
        setPage(1);
    }, [selectedLeagueId]);

    // When team changes, reset page
    useEffect(() => setPage(1), [selectedTeamId]);

    const leagueTeams = useMemo(() => teams.filter((t) => t.leagueId === selectedLeagueId), [teams, selectedLeagueId]);
    const teamProducts = useMemo(() => products.filter((p) => p.teamId === selectedTeamId), [products, selectedTeamId]);

    // Pagination calc
    const total = teamProducts.length;
    const perPage = pageSize;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const currentSlice = useMemo(() => teamProducts.slice((page - 1) * perPage, page * perPage), [teamProducts, page, perPage]);

    return (
        <main dir="rtl" className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white">
            <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">محصولات</h1>
                    <p className="mt-1 text-sm text-slate-500">لیگ و تیم مورد نظر را انتخاب کنید تا محصولات مرتبط نمایش داده شوند.</p>
                </header>

                {/* League picker */}
                <section className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {leagues.map((lg) => {
                            const active = lg.id === selectedLeagueId;
                            return (
                                <button
                                    key={lg.id}
                                    onClick={() => setSelectedLeagueId(lg.id)}
                                    className={`rounded-2xl border px-3 py-2 text-sm font-bold transition ${active
                                        ? "border-blue-300 bg-blue-50 text-blue-700"
                                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                        }`}
                                >
                                    {lg.name}
                                </button>
                            );
                        })}
                    </div>
                    {/* horizontal line */}
                    <div className="mt-4 h-px w-full bg-slate-200" />
                </section>

                {/* Team picker (for selected league) */}
                <section className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {leagueTeams.map((tm) => {
                            const active = tm.id === selectedTeamId;
                            return (
                                <button
                                    key={tm.id}
                                    onClick={() => setSelectedTeamId(tm.id)}
                                    className={`rounded-2xl border px-3 py-2 text-sm font-bold transition ${active
                                        ? "border-blue-300 bg-blue-50 text-blue-700"
                                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                        }`}
                                >
                                    {tm.name}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Product grid */}
                <section>
                    {currentSlice.length === 0 ? (
                        <EmptyState message="هیچ محصولی برای این تیم یافت نشد." />
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {currentSlice.map((p) => (
                                <ProductCard key={p.id} p={p} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Pagination component (no links, just state) */}
                {totalPages > 1 && (
                    <div className="mt-6">
                        <Pagination
                            page={page}
                            pageCount={totalPages}
                            onChange={(n) => {
                                // clamp inside and set
                                const next = Math.min(Math.max(1, n), totalPages);
                                setPage(next);
                                // scroll to top of products smoothly
                                window?.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}

// =============== Components ===============
function ProductCard({ p }: { p: ProductDemo }) {
    const price = p.hasDiscount && p.discountPrice ? p.discountPrice : p.price;
    const hasOff = p.hasDiscount && p.discountPrice && p.discountPrice < p.price;
    const fmt = (v: number) => new Intl.NumberFormat("fa-IR").format(v) + " تومان";
    return (
        <article className="group rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md">
            <div className="relative mb-3 aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-slate-100">
                <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <h3 className="line-clamp-1 text-sm font-bold text-slate-900">{p.title}</h3>
            <div className="mt-1 flex items-center gap-2">
                <span className="text-[13px] font-extrabold text-slate-900">{fmt(price)}</span>
                {hasOff && (
                    <span className="text-xs text-slate-400 line-through">{fmt(p.price)}</span>
                )}
            </div>
            <button className="mt-3 w-full rounded-xl bg-blue-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-blue-700">افزودن به سبد</button>
        </article>
    );
}

function Pagination({ page, pageCount, onChange }: { page: number; pageCount: number; onChange: (n: number) => void }) {
    const pages = useMemo(() => {
        const arr: number[] = [];
        // show up to 5 pages window
        const start = Math.max(1, page - 2);
        const end = Math.min(pageCount, start + 4);
        for (let i = Math.max(1, end - 4); i <= end; i++) arr.push(i);
        return arr;
    }, [page, pageCount]);

    return (
        <nav className="flex items-center justify-center gap-2" aria-label="pagination">
            <button
                onClick={() => onChange(page - 1)}
                disabled={page <= 1}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 disabled:opacity-40"
            >
                قبلی
            </button>
            {pages.map((n) => (
                <button
                    key={n}
                    onClick={() => onChange(n)}
                    className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${n === page ? "border-blue-300 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                >
                    {n}
                </button>
            ))}
            <button
                onClick={() => onChange(page + 1)}
                disabled={page >= pageCount}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 disabled:opacity-40"
            >
                بعدی
            </button>
        </nav>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3l3 2-1 3-2 1-2-1-1-3 3-2z" fill="currentColor" /></svg>
            </div>
            <p className="text-sm text-slate-500">{message}</p>
        </div>
    );
}
