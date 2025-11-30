"use client"
import { useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";                            

type MenuKey =
    | "overview"
    | "orders"
    | "products"
    | "inventory"
    | "customers"
    | "coupons"
    | "reports"
    | "settings";

const menuItems: { key: MenuKey; label: string; icon: string; href?: string }[] = [
    { key: "overview", label: "نمای کلی", icon: "📊", href:"/admin/overview"},
    { key: "orders", label: "سفارشات", icon: "🧾", href:"/admin/orders" },
    { key: "products", label: "محصولات", icon: "📦", href:"/admin/products" },
    { key: "inventory", label: "موجودی", icon: "📊", href:"/admin/inventory" },
    { key: "customers", label: "مشتریان", icon: "👥", href:"/admin/customers" },
    { key: "coupons", label: "کدهای تخفیف", icon: "🏷️", href:"/admin/coupons" },
    { key: "reports", label: "گزارش‌ها", icon: "📈", href:"/admin/reports" },
    { key: "settings", label: "تنظیمات", icon: "⚙️", href:"/admin/settings" },
];

interface Props {
   info?: string
   role?:string
}

export default  function AdminNav ({info,role}:Props)  {
    const pathName = usePathname()
    const pageName = pathName.split("/")[2]
    const [activeMenu, setActiveMenu] = useState<MenuKey>((pageName as MenuKey) || "overview");
    const [menuOpen, setMenuOpen] = useState(false); // برای موبایل
    const router = useRouter();
   

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userInfo")
    router.push("/"); // Client-side navigation
  };

   return(
   <>
            {/* سایدبار / تاپ‌بار */}
            <aside className="bg-white shadow-lg w-full lg:w-64 lg:h-screen flex flex-col z-20">
                {/* بالای سایدبار: پروفایل + دکمه منو موبایل */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b">
                    {/* پروفایل */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white text-lg sm:text-xl">
                              {info?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm sm:text-base font-semibold">
                              {info}
                            </span>
                            <span className="text-[11px] sm:text-xs text-slate-500">
                              {role}
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
                                <a
                                    onClick={() => {
                                        setActiveMenu(item.key);
                                        setMenuOpen(false); // روی موبایل بعد انتخاب بسته شود
                                    } }
                                    className={`w-full flex items-center justify-between px-4 sm:px-6 py-2.5 text-xs sm:text-sm transition
                    ${activeMenu === item.key
                        ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500"
                        : "text-slate-600 hover:bg-slate-50"}`} 
                        href={item.href}>
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">{item.icon}</span>
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* خروج */}
                <button 
               className="mt-auto flex items-center justify-between px-4 sm:px-6 py-3
               sm:py-4 text-red-500 text-xs sm:text-sm border-t"
               onClick={handleLogout}>
                    <span>خروج</span>
                    <span className="text-lg">↩</span>
                </button>
            </aside>
   </>
   )
}
 
