import Image from "next/image";

const categories = [
    { id: "national", label: "تیم‌های ملی", image: "/germany.png" },
    { id: "clubs", label: "باشگاهی", image: "/barcelona.png" },
    { id: "classic", label: "کلاسیک", image: "/realclassic.webp" },
    { id: "player", label: "پلیری", image: "/chelsea.png" },
];

const CategoryCard = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
                {categories.map(c => (
                    <div key={c.id} className="rounded-[32px] bg-white shadow-md hover:shadow-2xl transition p-6 flex flex-col items-center text-center border border-slate-100 hover:-translate-y-1 duration-300">
                        <div className="w-28 h-28 rounded-full overflow-hidden shadow-md ring-4 ring-blue-100">
                            <Image alt={c.label} src={c.image} width={300} height={300} className="h-full w-full object-cover" />
                        </div>
                        <div className="mt-4 font-bold text-lg text-slate-800">{c.label}</div>
                        <p className="mt-1 text-slate-500 text-sm">کالکشن خاص</p>
                        <button className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-5 py-2 text-sm hover:bg-blue-700 transition">مشاهده</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CategoryCard;