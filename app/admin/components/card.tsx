const Card: React.FC<{ title?: string; children: React.ReactNode }> = ({
    title,
    children,
}) => (
    <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-5">
        {title && (
            <header className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
            </header>
        )}
        {children}
    </section>
);
export default Card
