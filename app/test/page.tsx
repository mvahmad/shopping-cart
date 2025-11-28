"use client"
// import React, { useState } from "react";


// type MenuKey =
//     | "overview"
//     | "orders"
//     | "products"
//     | "inventory"
//     | "customers"
//     | "coupons"
//     | "reports"
//     | "settings";

// const menuItems: { key: MenuKey; label: string; icon?: string }[] = [
//     { key: "overview", label: "نمای کلی", icon: "📊" },
//     { key: "orders", label: "سفارشات", icon: "🧾" },
//     { key: "products", label: "محصولات", icon: "📦" },
//     { key: "inventory", label: "موجودی", icon: "📊" },
//     { key: "customers", label: "مشتریان", icon: "👥" },
//     { key: "coupons", label: "کدهای تخفیف", icon: "🏷️" },
//     { key: "reports", label: "گزارش‌ها", icon: "📈" },
//     { key: "settings", label: "تنظیمات", icon: "⚙️" },
// ];

// const AdminDashboard: React.FC = () => {
//     const [activeMenu, setActiveMenu] = useState<MenuKey>("overview");

//     return (
//         <div
//             dir="rtl"
//             className="min-h-screen bg-slate-100 text-slate-800 flex"
//         >
//             {/* Sidebar */}
//             <aside className="w-64 bg-white shadow-lg flex flex-col">
//                 {/* Profile */}
//                 <div className="flex items-center gap-3 px-6 py-6 border-b">
//                     <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white text-xl">
//                         ع
//                     </div>
//                     <div className="flex flex-col">
//                         <span className="font-semibold">علی عطاری</span>
//                         <span className="text-xs text-slate-500">مدیریت سایت</span>
//                     </div>
//                 </div>

//                 {/* Menu */}
//                 <nav className="flex-1 py-4">
//                     <ul className="space-y-1">
//                         {menuItems.map((item) => (
//                             <li key={item.key}>
//                                 <button
//                                     onClick={() => setActiveMenu(item.key)}
//                                     className={`w-full flex items-center justify-between px-6 py-2.5 text-sm transition
//                     ${activeMenu === item.key
//                                             ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500"
//                                             : "text-slate-600 hover:bg-slate-50"
//                                         }`}
//                                 >
//                                     <span className="flex items-center gap-2">
//                                         <span className="text-lg">{item.icon}</span>
//                                         {item.label}
//                                     </span>
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>

//                 {/* Logout */}
//                 <button className="mt-auto flex items-center justify-between px-6 py-4 text-red-500 text-sm border-t">
//                     <span>خروج</span>
//                     <span className="text-lg">↩</span>
//                 </button>
//             </aside>

//             {/* Main content */}
//             <main className="flex-1 px-8 py-6">
//                 {activeMenu === "overview" && <OverviewSection />}
//                 {activeMenu === "orders" && <OrdersSection />}
//                 {activeMenu === "products" && <ProductsSection />}
//                 {activeMenu === "inventory" && <InventorySection />}
//                 {activeMenu === "customers" && <CustomersSection />}
//                 {activeMenu === "coupons" && <CouponsSection />}
//                 {activeMenu === "reports" && <ReportsSection />}
//                 {activeMenu === "settings" && <SettingsSection />}
//             </main>
//         </div>
//     );
// };

// export default AdminDashboard;

// /* -------------------- Shared Components -------------------- */

// interface StatCardProps {
//     title: string;
//     value: string;
//     caption?: string;
//     accent?: "green" | "blue" | "orange" | "red";
// }

// const StatCard: React.FC<StatCardProps> = ({
//     title,
//     value,
//     caption,
//     accent = "blue",
// }) => {
//     const accentColor: Record<NonNullable<StatCardProps["accent"]>, string> = {
//         green: "text-emerald-500",
//         blue: "text-blue-500",
//         orange: "text-orange-500",
//         red: "text-red-500",
//     };

//     return (
//         <div className="bg-white rounded-2xl shadow-sm px-5 py-4 flex flex-col gap-1">
//             <span className="text-xs text-slate-500">{title}</span>
//             <span className={`text-lg font-semibold ${accentColor[accent]}`}>
//                 {value}
//             </span>
//             {caption && <span className="text-xs text-slate-400">{caption}</span>}
//         </div>
//     );
// };

// const Card: React.FC<{ title?: string; children: React.ReactNode }> = ({
//     title,
//     children,
// }) => (
//     <section className="bg-white rounded-2xl shadow-sm p-5">
//         {title && (
//             <header className="mb-4 flex items-center justify-between">
//                 <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
//             </header>
//         )}
//         {children}
//     </section>
// );

// /* -------------------- Sections -------------------- */

// const OverviewSection: React.FC = () => {
//     return (
//         <div className="space-y-5">
//             {/* Top stats like your first screenshot */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//                 <StatCard title="تعداد کاربران" value="۳۴۵ نفر" accent="blue" />
//                 <StatCard title="فروش روزانه" value="۱,۲۵۶,۰۰۰ تومان" accent="green" />
//                 <StatCard title="سود روزانه" value="۸۵۶,۰۰۰ تومان" accent="green" />
//                 <StatCard
//                     title="فروش ماهانه"
//                     value="۸۵,۶۰۰,۰۰۰ تومان"
//                     accent="orange"
//                 />
//             </div>

//             {/* Sales chart placeholder */}
//             <Card title="نمودار فروش کیت‌ها">
//                 <div className="h-72 flex items-center justify-center border border-dashed border-slate-200 rounded-xl">
//                     {/* اینجا بعداً می‌تونی Chart.js یا Recharts وصل کنی */}
//                     <span className="text-xs text-slate-400">
//                         اینجا نمودار فروش سال ۱۴۰۱ و ۱۴۰۲ قرار می‌گیرد
//                     </span>
//                 </div>
//             </Card>

//             {/* Bottom: best sellers & low stock */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                 <Card title="پرفروش‌ترین کیت‌ها">
//                     <table className="w-full text-xs text-slate-600">
//                         <thead className="border-b">
//                             <tr className="[&>th]:py-2 [&>th]:text-right">
//                                 <th>نام کیت</th>
//                                 <th>لیگ</th>
//                                 <th>تیم</th>
//                                 <th>فروش ماهانه</th>
//                             </tr>
//                         </thead>
//                         <tbody className="[&>tr]:border-b">
//                             <tr className="[&>td]:py-2">
//                                 <td>کیت اول بارسلونا ۲۴-۲۰۲۳</td>
//                                 <td>لالیگا</td>
//                                 <td>بارسلونا</td>
//                                 <td>۲۳۸ عدد</td>
//                             </tr>
//                             <tr className="[&>td]:py-2">
//                                 <td>کیت خانگی رئال مادرید</td>
//                                 <td>لالیگا</td>
//                                 <td>رئال مادرید</td>
//                                 <td>۱۹۴ عدد</td>
//                             </tr>
//                             <tr className="[&>td]:py-2">
//                                 <td>کیت لیورپول ۲۴-۲۰۲۳</td>
//                                 <td>پریمیرلیگ</td>
//                                 <td>لیورپول</td>
//                                 <td>۱۷۸ عدد</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </Card>

//                 <Card title="کیت‌های رو به اتمام">
//                     <table className="w-full text-xs text-slate-600">
//                         <thead className="border-b">
//                             <tr className="[&>th]:py-2 [&>th]:text-right">
//                                 <th>نام محصول</th>
//                                 <th>لیگ</th>
//                                 <th>موجودی</th>
//                                 <th></th>
//                             </tr>
//                         </thead>
//                         <tbody className="[&>tr]:border-b">
//                             <tr className="[&>td]:py-2">
//                                 <td>کیت دوم منچسترسیتی</td>
//                                 <td>پریمیرلیگ</td>
//                                 <td className="text-red-500 font-semibold">۵ عدد</td>
//                                 <td>
//                                     <span className="px-2 py-1 rounded-full bg-red-50 text-red-500 text-[10px]">
//                                         نیاز به شارژ
//                                     </span>
//                                 </td>
//                             </tr>
//                             <tr className="[&>td]:py-2">
//                                 <td>کیت یوونتوس راه‌راه</td>
//                                 <td>سری A</td>
//                                 <td className="text-orange-500 font-semibold">۹ عدد</td>
//                                 <td>
//                                     <span className="px-2 py-1 rounded-full bg-orange-50 text-orange-500 text-[10px]">
//                                         رو به اتمام
//                                     </span>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// const OrdersSection: React.FC = () => {
//     return (
//         <div className="space-y-4">
//             {/* Filters */}
//             <div className="flex flex-wrap items-center gap-3">
//                 <h1 className="text-base font-semibold">سفارشات</h1>
//                 <div className="flex flex-wrap gap-2 text-xs">
//                     <select className="border border-slate-200 rounded-xl px-3 py-1 bg-white">
//                         <option>همه وضعیت‌ها</option>
//                         <option>در حال پردازش</option>
//                         <option>ارسال شده</option>
//                         <option>لغو شده</option>
//                     </select>
//                     <select className="border border-slate-200 rounded-xl px-3 py-1 bg-white">
//                         <option>همه لیگ‌ها</option>
//                         <option>لالیگا</option>
//                         <option>پریمیرلیگ</option>
//                         <option>سری A</option>
//                     </select>
//                 </div>
//             </div>

//             <Card>
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-xs text-slate-600">
//                         <thead className="border-b bg-slate-50">
//                             <tr className="[&>th]:py-2 [&>th]:px-2 [&>th]:text-right">
//                                 <th>شماره سفارش</th>
//                                 <th>مشتری</th>
//                                 <th>تاریخ</th>
//                                 <th>تعداد اقلام</th>
//                                 <th>مجموع</th>
//                                 <th>وضعیت</th>
//                                 <th>عملیات</th>
//                             </tr>
//                         </thead>
//                         <tbody className="[&>tr]:border-b">
//                             <tr className="[&>td]:py-2 [&>td]:px-2">
//                                 <td>#۱۲۳۴</td>
//                                 <td>محمد رضایی</td>
//                                 <td>۱۴۰۲/۰۹/۰۳</td>
//                                 <td>۳</td>
//                                 <td>۱,۵۶۰,۰۰۰ تومان</td>
//                                 <td>
//                                     <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-500 text-[10px]">
//                                         در حال پردازش
//                                     </span>
//                                 </td>
//                                 <td className="space-x-1 space-x-reverse">
//                                     <button className="text-xs text-blue-500">جزئیات</button>
//                                     <button className="text-xs text-emerald-500">ارسال شد</button>
//                                 </td>
//                             </tr>
//                             <tr className="[&>td]:py-2 [&>td]:px-2">
//                                 <td>#۱۲۳۵</td>
//                                 <td>سارا احمدی</td>
//                                 <td>۱۴۰۲/۰۹/۰۳</td>
//                                 <td>۱</td>
//                                 <td>۸۹۰,۰۰۰ تومان</td>
//                                 <td>
//                                     <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-500 text-[10px]">
//                                         ارسال شده
//                                     </span>
//                                 </td>
//                                 <td>
//                                     <button className="text-xs text-blue-500">جزئیات</button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </Card>
//         </div>
//     );
// };

// const ProductsSection: React.FC = () => {
//     return (
//         <div className="space-y-4">
//             {/* Header + filters */}
//             <div className="flex flex-wrap items-center justify-between gap-3">
//                 <h1 className="text-base font-semibold">محصولات (کیت‌ها)</h1>
//                 <button className="text-xs bg-blue-500 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-blue-600">
//                     + افزودن محصول جدید
//                 </button>
//             </div>

//             <div className="flex flex-wrap gap-2 text-xs">
//                 <select className="border border-slate-200 rounded-xl px-3 py-1 bg-white">
//                     <option>همه لیگ‌ها</option>
//                     <option>لالیگا</option>
//                     <option>پریمیرلیگ</option>
//                     <option>سری A</option>
//                 </select>
//                 <select className="border border-slate-200 rounded-xl px-3 py-1 bg-white">
//                     <option>همه تیم‌ها</option>
//                     <option>بارسلونا</option>
//                     <option>رئال مادرید</option>
//                     <option>لیورپول</option>
//                 </select>
//             </div>

//             <Card>
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-xs text-slate-600">
//                         <thead className="border-b bg-slate-50">
//                             <tr className="[&>th]:py-2 [&>th]:px-2 [&>th]:text-right">
//                                 <th>شماره</th>
//                                 <th>نام محصول</th>
//                                 <th>لیگ</th>
//                                 <th>تیم</th>
//                                 <th>قیمت</th>
//                                 <th>فروش ماهانه</th>
//                                 <th>موجودی</th>
//                                 <th>کد رنگ</th>
//                                 <th>دانلود</th>
//                                 <th>تنظیمات</th>
//                             </tr>
//                         </thead>
//                         <tbody className="[&>tr]:border-b">
//                             <tr className="[&>td]:py-2 [&>td]:px-2">
//                                 <td>۱</td>
//                                 <td>کیت اول بارسلونا ۲۴-۲۰۲۳</td>
//                                 <td>لالیگا</td>
//                                 <td>بارسلونا</td>
//                                 <td>۸۹۰,۰۰۰ تومان</td>
//                                 <td>۲۶ محصول</td>
//                                 <td>۳۵ عدد</td>
//                                 <td>
//                                     <span className="inline-block w-5 h-5 rounded-md border" style={{ backgroundColor: "#ff7136" }} />
//                                 </td>
//                                 <td>
//                                     <button className="text-emerald-500">⬇</button>
//                                 </td>
//                                 <td className="flex gap-2">
//                                     <button className="text-yellow-500">✏️</button>
//                                     <button className="text-red-500">🗑️</button>
//                                 </td>
//                             </tr>
//                             <tr className="[&>td]:py-2 [&>td]:px-2">
//                                 <td>۲</td>
//                                 <td>کیت خانگی رئال مادرید</td>
//                                 <td>لالیگا</td>
//                                 <td>رئال مادرید</td>
//                                 <td>۸۹۰,۰۰۰ تومان</td>
//                                 <td>۳۵ محصول</td>
//                                 <td>۶۰ عدد</td>
//                                 <td>
//                                     <span className="inline-block w-5 h-5 rounded-md border" style={{ backgroundColor: "#0c0617" }} />
//                                 </td>
//                                 <td>
//                                     <button className="text-emerald-500">⬇</button>
//                                 </td>
//                                 <td className="flex gap-2">
//                                     <button className="text-yellow-500">✏️</button>
//                                     <button className="text-red-500">🗑️</button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </Card>
//         </div>
//     );
// };

// const InventorySection: React.FC = () => {
//     return (
//         <div className="space-y-4">
//             <h1 className="text-base font-semibold">مدیریت موجودی</h1>
//             <Card>
//                 <div className="space-y-4 text-xs">
//                     {[
//                         { name: "کیت اول بارسلونا ۲۴-۲۰۲۳", stock: 35, min: 20 },
//                         { name: "کیت خانگی رئال مادرید", stock: 60, min: 30 },
//                         { name: "کیت دوم منچسترسیتی", stock: 5, min: 15 },
//                     ].map((item) => {
//                         const percent = Math.min(100, (item.stock / (item.min * 2)) * 100);
//                         const color =
//                             item.stock <= item.min
//                                 ? "bg-red-500"
//                                 : item.stock <= item.min * 1.5
//                                     ? "bg-orange-400"
//                                     : "bg-emerald-500";
//                         return (
//                             <div key={item.name} className="space-y-1">
//                                 <div className="flex items-center justify-between">
//                                     <span>{item.name}</span>
//                                     <span className="text-slate-400">
//                                         موجودی: {item.stock} / حداقل: {item.min}
//                                     </span>
//                                 </div>
//                                 <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
//                                     <div
//                                         className={`h-full ${color}`}
//                                         style={{ width: `${percent}%` }}
//                                     />
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </Card>
//         </div>
//     );
// };

// const CustomersSection: React.FC = () => {
//     return (
//         <div className="space-y-4">
//             <h1 className="text-base font-semibold">مشتریان</h1>
//             <Card>
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-xs text-slate-600">
//                         <thead className="border-b bg-slate-50">
//                             <tr className="[&>th]:py-2 [&>th]:px-2 [&>th]:text-right">
//                                 <th>نام</th>
//                                 <th>ایمیل</th>
//                                 <th>تعداد سفارش</th>
//                                 <th>مجموع خرید</th>
//                                 <th>آخرین خرید</th>
//                             </tr>
//                         </thead>
//                         <tbody className="[&>tr]:border-b">
//                             <tr className="[&>td]:py-2 [&>td]:px-2">
//                                 <td>محمد رضایی</td>
//                                 <td>m.rezaei@example.com</td>
//                                 <td>۱۲</td>
//                                 <td>۱۲,۸۰۰,۰۰۰ تومان</td>
//                                 <td>۱۴۰۲/۰۹/۰۳</td>
//                             </tr>
//                             <tr className="[&>td]:py-2 [&>td]:px-2">
//                                 <td>سارا احمدی</td>
//                                 <td>s.ahmadi@example.com</td>
//                                 <td>۶</td>
//                                 <td>۵,۲۰۰,۰۰۰ تومان</td>
//                                 <td>۱۴۰۲/۰۹/۰۲</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </Card>
//         </div>
//     );
// };

// const CouponsSection: React.FC = () => {
//     return (
//         <div className="space-y-4">
//             <div className="flex items-center justify-between">
//                 <h1 className="text-base font-semibold">کدهای تخفیف</h1>
//                 <button className="text-xs bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-emerald-600">
//                     + افزودن کد جدید
//                 </button>
//             </div>

//             <Card>
//                 <table className="w-full text-xs text-slate-600">
//                     <thead className="border-b bg-slate-50">
//                         <tr className="[&>th]:py-2 [&>th]:px-2 [&>th]:text-right">
//                             <th>کد</th>
//                             <th>نوع تخفیف</th>
//                             <th>مقدار</th>
//                             <th>حداقل خرید</th>
//                             <th>تعداد استفاده</th>
//                             <th>وضعیت</th>
//                         </tr>
//                     </thead>
//                     <tbody className="[&>tr]:border-b">
//                         <tr className="[&>td]:py-2 [&>td]:px-2">
//                             <td>BARCA10</td>
//                             <td>درصدی</td>
//                             <td>۱۰٪</td>
//                             <td>۵۰۰,۰۰۰ تومان</td>
//                             <td>۲۳ / ۵۰</td>
//                             <td>
//                                 <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-500 text-[10px]">
//                                     فعال
//                                 </span>
//                             </td>
//                         </tr>
//                         <tr className="[&>td]:py-2 [&>td]:px-2">
//                             <td>BLACKFRIDAY</td>
//                             <td>مبلغ ثابت</td>
//                             <td>۲۰۰,۰۰۰ تومان</td>
//                             <td>۱,۰۰۰,۰۰۰ تومان</td>
//                             <td>۱۰۰ / ۱۰۰</td>
//                             <td>
//                                 <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-400 text-[10px]">
//                                     منقضی شده
//                                 </span>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </Card>
//         </div>
//     );
// };

// const ReportsSection: React.FC = () => {
//     return (
//         <div className="space-y-4">
//             <h1 className="text-base font-semibold">گزارش‌ها</h1>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 <Card title="گزارش فروش ماهانه">
//                     <p className="text-xs text-slate-500">
//                         محل قرار دادن نمودار
//                     </p>
//                 </Card>
//                 <Card title="گزارش سود">
//                     <p className="text-xs text-slate-500">
//                         خلاصه سود ناخالص بر اساس بازه زمانی و کانال فروش.
//                     </p>
//                 </Card>
//                 <Card title="گزارش رفتار مشتریان">
//                     <p className="text-xs text-slate-500">
//                         مشتریان وفادار، میانگین سبد خرید، نرخ بازگشت مشتری.
//                     </p>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// const SettingsSection: React.FC = () => {
//     return (
//         <div className="space-y-4 max-w-xl">
//             <h1 className="text-base font-semibold">تنظیمات فروشگاه</h1>
//             <Card>
//                 <form className="space-y-4 text-xs">
//                     <div className="space-y-1">
//                         <label className="block text-slate-600">نام فروشگاه</label>
//                         <input
//                             className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
//                             defaultValue="فروشگاه آنلاین کیت ورزشی"
//                         />
//                     </div>
//                     <div className="space-y-1">
//                         <label className="block text-slate-600">ایمیل مدیریت</label>
//                         <input
//                             className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
//                             defaultValue="info@example.com"
//                         />
//                     </div>
//                     <div className="space-y-1">
//                         <label className="block text-slate-600">روش‌های ارسال</label>
//                         <textarea
//                             className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs min-h-[80px] focus:outline-none focus:ring-1 focus:ring-blue-400"
//                             defaultValue="پست پیشتاز، پیک تهران، تحویل حضوری"
//                         />
//                     </div>
//                     <div className="space-y-1">
//                         <label className="block text-slate-600">درگاه‌های پرداخت</label>
//                         <input
//                             className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
//                             defaultValue="زرین‌پال، ملت"
//                         />
//                     </div>

//                     <button
//                         type="button"
//                         className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl text-xs hover:bg-blue-600"
//                     >
//                         ذخیره تغییرات
//                     </button>
//                 </form>
//             </Card>
//         </div>
//     );
// };

import React, { useState } from "react";

/* ---------------------- انواع و داده‌ها ---------------------- */

type MenuKey =
    | "overview"
    | "orders"
    | "products"
    | "inventory"
    | "customers"
    | "coupons"
    | "reports"
    | "settings";

const menuItems: { key: MenuKey; label: string; icon: string }[] = [
    { key: "overview", label: "نمای کلی", icon: "📊" },
    { key: "orders", label: "سفارشات", icon: "🧾" },
    { key: "products", label: "محصولات", icon: "📦" },
    { key: "inventory", label: "موجودی", icon: "📊" },
    { key: "customers", label: "مشتریان", icon: "👥" },
    { key: "coupons", label: "کدهای تخفیف", icon: "🏷️" },
    { key: "reports", label: "گزارش‌ها", icon: "📈" },
    { key: "settings", label: "تنظیمات", icon: "⚙️" },
];

/* ---------------------- کامپوننت اصلی داشبورد ---------------------- */

const AdminDashboard: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<MenuKey>("overview");
    const [menuOpen, setMenuOpen] = useState(false); // برای موبایل

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-slate-100 text-slate-800 flex flex-col lg:flex-row"
        >
            {/* سایدبار / تاپ‌بار */}
            <aside className="bg-white shadow-lg w-full lg:w-64 lg:h-screen flex flex-col z-20">
                {/* بالای سایدبار: پروفایل + دکمه منو موبایل */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b">
                    {/* پروفایل */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white text-lg sm:text-xl">
                            ع
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm sm:text-base font-semibold">
                                علی عطاری
                            </span>
                            <span className="text-[11px] sm:text-xs text-slate-500">
                                مدیریت سایت
                            </span>
                        </div>
                    </div>

                    {/* دکمه "منو" فقط در موبایل/تبلت */}
                    <button
                        className="lg:hidden rounded-xl border border-slate-200 px-3 py-1 text-xs text-slate-600"
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        {menuOpen ? "بستن" : "منو"}
                    </button>
                </div>

                {/* لیست منوها */}
                <nav
                    className={`lg:flex-1 py-2 lg:py-4 border-t lg:border-t-0 ${menuOpen ? "block" : "hidden"
                        } lg:block`}
                >
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.key}>
                                <button
                                    onClick={() => {
                                        setActiveMenu(item.key);
                                        setMenuOpen(false); // روی موبایل بعد انتخاب بسته شود
                                    }}
                                    className={`w-full flex items-center justify-between px-4 sm:px-6 py-2.5 text-xs sm:text-sm transition
                    ${activeMenu === item.key
                                            ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500"
                                            : "text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">{item.icon}</span>
                                        {item.label}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* خروج */}
                <button className="mt-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-red-500 text-xs sm:text-sm border-t">
                    <span>خروج</span>
                    <span className="text-lg">↩</span>
                </button>
            </aside>

            {/* محتوای اصلی */}
            <main className="flex-1 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
                {activeMenu === "overview" && <OverviewSection />}
                {activeMenu === "orders" && <OrdersSection />}
                {activeMenu === "products" && <ProductsSection />}
                {activeMenu === "inventory" && <InventorySection />}
                {activeMenu === "customers" && <CustomersSection />}
                {activeMenu === "coupons" && <CouponsSection />}
                {activeMenu === "reports" && <ReportsSection />}
                {activeMenu === "settings" && <SettingsSection />}
            </main>
        </div>
    );
};

export default AdminDashboard;

/* ---------------------- کامپوننت‌های کمکی عمومی ---------------------- */

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

/* ---------------------- سکشن‌ها ---------------------- */

/* نمای کلی */
const OverviewSection: React.FC = () => {
    return (
        <div className="space-y-4 sm:space-y-5">
            {/* کارت‌های بالا */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                <StatCard title="تعداد کاربران" value="۳۴۵ نفر" accent="blue" />
                <StatCard title="فروش روزانه" value="۱,۲۵۶,۰۰۰ تومان" accent="green" />
                <StatCard title="سود روزانه" value="۸۵۶,۰۰۰ تومان" accent="green" />
                <StatCard
                    title="فروش ماهانه"
                    value="۸۵,۶۰۰,۰۰۰ تومان"
                    accent="orange"
                />
            </div>

            {/* نمودار فروش (placeholder) */}
            <Card title="نمودار فروش کیت‌ها">
                <div className="h-56 sm:h-72 flex items-center justify-center border border-dashed border-slate-200 rounded-xl">
                    <span className="text-[11px] sm:text-xs text-slate-400">
                        اینجا بعداً نمودار واقعی (Chart.js / Recharts) قرار میدیم
                        به کمک آقا احمد گل.
                    </span>
                </div>
            </Card>

            {/* پرفروش‌ها + رو به اتمام‌ها */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <Card title="پرفروش‌ترین کیت‌ها">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[11px] sm:text-xs text-slate-600">
                            <thead className="border-b">
                                <tr className="[&>th]:py-2 [&>th]:text-right">
                                    <th>نام کیت</th>
                                    <th>لیگ</th>
                                    <th>تیم</th>
                                    <th>فروش ماهانه</th>
                                </tr>
                            </thead>
                            <tbody className="[&>tr]:border-b">
                                <tr className="[&>td]:py-2">
                                    <td>کیت اول بارسلونا ۲۴-۲۰۲۳</td>
                                    <td>لالیگا</td>
                                    <td>بارسلونا</td>
                                    <td>۲۳۸ عدد</td>
                                </tr>
                                <tr className="[&>td]:py-2">
                                    <td>کیت خانگی رئال مادرید</td>
                                    <td>لالیگا</td>
                                    <td>رئال مادرید</td>
                                    <td>۱۹۴ عدد</td>
                                </tr>
                                <tr className="[&>td]:py-2">
                                    <td>کیت لیورپول ۲۴-۲۰۲۳</td>
                                    <td>پریمیرلیگ</td>
                                    <td>لیورپول</td>
                                    <td>۱۷۸ عدد</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card title="کیت‌های رو به اتمام">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[11px] sm:text-xs text-slate-600">
                            <thead className="border-b">
                                <tr className="[&>th]:py-2 [&>th]:text-right">
                                    <th>نام محصول</th>
                                    <th>لیگ</th>
                                    <th>موجودی</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="[&>tr]:border-b">
                                <tr className="[&>td]:py-2">
                                    <td>کیت دوم منچسترسیتی</td>
                                    <td>پریمیرلیگ</td>
                                    <td className="text-red-500 font-semibold">۵ عدد</td>
                                    <td>
                                        <span className="px-2 py-1 rounded-full bg-red-50 text-red-500 text-[10px]">
                                            نیاز به شارژ
                                        </span>
                                    </td>
                                </tr>
                                <tr className="[&>td]:py-2">
                                    <td>کیت یوونتوس راه‌راه</td>
                                    <td>سری A</td>
                                    <td className="text-orange-500 font-semibold">۹ عدد</td>
                                    <td>
                                        <span className="px-2 py-1 rounded-full bg-orange-50 text-orange-500 text-[10px]">
                                            رو به اتمام
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

/* سفارشات */
const OrdersSection: React.FC = () => (
    <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-sm sm:text-base font-semibold">سفارشات</h1>
            <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
                <select className="border border-slate-200 rounded-xl px-3 py-1 bg-white">
                    <option>همه وضعیت‌ها</option>
                    <option>در حال پردازش</option>
                    <option>ارسال شده</option>
                    <option>لغو شده</option>
                </select>
                <select className="border border-slate-200 rounded-xl px-3 py-1 bg-white">
                    <option>همه لیگ‌ها</option>
                    <option>لالیگا</option>
                    <option>پریمیرلیگ</option>
                    <option>سری A</option>
                </select>
            </div>
        </div>

        <Card>
            <div className="overflow-x-auto">
                <table className="w-full text-[11px] sm:text-xs text-slate-600">
                    <thead className="border-b bg-slate-50">
                        <tr className="[&>th]:py-2 [&>th]:px-2 [&>th]:text-right">
                            <th>شماره سفارش</th>
                            <th>مشتری</th>
                            <th>تاریخ</th>
                            <th>تعداد اقلام</th>
                            <th>مجموع</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody className="[&>tr]:border-b">
                        <tr className="[&>td]:py-2 [&>td]:px-2">
                            <td>#۱۲۳۴</td>
                            <td>محمد رضایی</td>
                            <td>۱۴۰۲/۰۹/۰۳</td>
                            <td>۳</td>
                            <td>۱,۵۶۰,۰۰۰ تومان</td>
                            <td>
                                <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-500 text-[10px]">
                                    در حال پردازش
                                </span>
                            </td>
                            <td className="space-x-1 space-x-reverse">
                                <button className="text-[10px] sm:text-xs text-blue-500">
                                    جزئیات
                                </button>
                                <button className="text-[10px] sm:text-xs text-emerald-500">
                                    ارسال شد
                                </button>
                            </td>
                        </tr>
                        <tr className="[&>td]:py-2 [&>td]:px-2">
                            <td>#۱۲۳۵</td>
                            <td>سارا احمدی</td>
                            <td>۱۴۰۲/۰۹/۰۳</td>
                            <td>۱</td>
                            <td>۸۹۰,۰۰۰ تومان</td>
                            <td>
                                <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-500 text-[10px]">
                                    ارسال شده
                                </span>
                            </td>
                            <td>
                                <button className="text-[10px] sm:text-xs text-blue-500">
                                    جزئیات
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);

/* محصولات */
const ProductsSection: React.FC = () => (
    <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-sm sm:text-base font-semibold">محصولات (کیت‌ها)</h1>
            <button className="text-[11px] sm:text-xs bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-xl shadow-sm hover:bg-blue-600">
                + افزودن محصول جدید
            </button>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
            <select className="border border-slate-200 rounded-xl px-3 py-1 bg-white">
                <option>همه لیگ‌ها</option>
                <option>لالیگا</option>
                <option>پریمیرلیگ</option>
                <option>سری A</option>
            </select>
            <select className="border border-slate-200 rounded-xl px-3 py-1 bg-white">
                <option>همه تیم‌ها</option>
                <option>بارسلونا</option>
                <option>رئال مادرید</option>
                <option>لیورپول</option>
            </select>
        </div>

        <Card>
            <div className="overflow-x-auto">
                <table className="w-full text-[11px] sm:text-xs text-slate-600">
                    <thead className="border-b bg-slate-50">
                        <tr className="[&>th]:py-2 [&>th]:px-2 [&>th]:text-right">
                            <th>شماره</th>
                            <th>نام محصول</th>
                            <th>لیگ</th>
                            <th>تیم</th>
                            <th>قیمت</th>
                            <th>فروش ماهانه</th>
                            <th>موجودی</th>
                            <th>کد رنگ</th>
                            <th>دانلود</th>
                            <th>تنظیمات</th>
                        </tr>
                    </thead>
                    <tbody className="[&>tr]:border-b">
                        <tr className="[&>td]:py-2 [&>td]:px-2">
                            <td>۱</td>
                            <td>کیت اول بارسلونا ۲۴-۲۰۲۳</td>
                            <td>لالیگا</td>
                            <td>بارسلونا</td>
                            <td>۸۹۰,۰۰۰ تومان</td>
                            <td>۲۶ محصول</td>
                            <td>۳۵ عدد</td>
                            <td>
                                <span
                                    className="inline-block w-5 h-5 rounded-md border"
                                    style={{ backgroundColor: "#ff7136" }}
                                />
                            </td>
                            <td>
                                <button className="text-emerald-500">⬇</button>
                            </td>
                            <td className="flex gap-1">
                                <button className="text-yellow-500 text-sm">✏️</button>
                                <button className="text-red-500 text-sm">🗑️</button>
                            </td>
                        </tr>
                        <tr className="[&>td]:py-2 [&>td]:px-2">
                            <td>۲</td>
                            <td>کیت خانگی رئال مادرید</td>
                            <td>لالیگا</td>
                            <td>رئال مادرید</td>
                            <td>۸۹۰,۰۰۰ تومان</td>
                            <td>۳۵ محصول</td>
                            <td>۶۰ عدد</td>
                            <td>
                                <span
                                    className="inline-block w-5 h-5 rounded-md border"
                                    style={{ backgroundColor: "#0c0617" }}
                                />
                            </td>
                            <td>
                                <button className="text-emerald-500">⬇</button>
                            </td>
                            <td className="flex gap-1">
                                <button className="text-yellow-500 text-sm">✏️</button>
                                <button className="text-red-500 text-sm">🗑️</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);

/* موجودی */
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

/* مشتریان */
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

/* کدهای تخفیف */
const CouponsSection: React.FC = () => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h1 className="text-sm sm:text-base font-semibold">کدهای تخفیف</h1>
            <button className="text-[11px] sm:text-xs bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-xl shadow-sm hover:bg-emerald-600">
                + افزودن کد جدید
            </button>
        </div>

        <Card>
            <div className="overflow-x-auto">
                <table className="w-full text-[11px] sm:text-xs text-slate-600">
                    <thead className="border-b bg-slate-50">
                        <tr className="[&>th]:py-2 [&>th]:px-2 [&>th]:text-right">
                            <th>کد</th>
                            <th>نوع تخفیف</th>
                            <th>مقدار</th>
                            <th>حداقل خرید</th>
                            <th>تعداد استفاده</th>
                            <th>وضعیت</th>
                        </tr>
                    </thead>
                    <tbody className="[&>tr]:border-b">
                        <tr className="[&>td]:py-2 [&>td]:px-2">
                            <td>BARCA10</td>
                            <td>درصدی</td>
                            <td>۱۰٪</td>
                            <td>۵۰۰,۰۰۰ تومان</td>
                            <td>۲۳ / ۵۰</td>
                            <td>
                                <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-500 text-[10px]">
                                    فعال
                                </span>
                            </td>
                        </tr>
                        <tr className="[&>td]:py-2 [&>td]:px-2">
                            <td>BLACKFRIDAY</td>
                            <td>مبلغ ثابت</td>
                            <td>۲۰۰,۰۰۰ تومان</td>
                            <td>۱,۰۰۰,۰۰۰ تومان</td>
                            <td>۱۰۰ / ۱۰۰</td>
                            <td>
                                <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-400 text-[10px]">
                                    منقضی شده
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);

/* گزارش‌ها */
const ReportsSection: React.FC = () => (
    <div className="space-y-4">
        <h1 className="text-sm sm:text-base font-semibold">گزارش‌ها</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            <Card title="گزارش فروش ماهانه">
                <p className="text-[11px] sm:text-xs text-slate-500">
                    محل قرار دادن نمودار.
                </p>
            </Card>
            <Card title="گزارش سود">
                <p className="text-[11px] sm:text-xs text-slate-500">
                    خلاصه سود ناخالص بر اساس بازه زمانی و کانال فروش.
                </p>
            </Card>
            <Card title="گزارش رفتار مشتریان">
                <p className="text-[11px] sm:text-xs text-slate-500">
                    مشتریان وفادار، میانگین سبد خرید، نرخ بازگشت مشتری و ...
                </p>
            </Card>
        </div>
    </div>
);

/* تنظیمات */
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
