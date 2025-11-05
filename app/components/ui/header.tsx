
//
"use client"
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { BsBasket3 } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { motion } from "framer-motion";
import logo from "@/public/logo.png"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
export default function Header() {
	const accessToken = Cookies.get('accessToken');
	const [adminHref, setAdminHref] = useState<string>('/login')
	useEffect(() => {
		if (accessToken) {
			setAdminHref('/personal-info')
		}
	}, [accessToken])

	const pathname = usePathname();
	return (
		<>
			{/* ---------- Header (Desktop + Tablet) ---------- */}
			<header className="hidden sm:flex sticky top-0 bg-white shadow-md z-50 px-6 md:px-12 lg:px-20 py-3 items-center justify-between">
				{/* logo */}
				<div className="flex items-center gap-2">
					<Image
						src={logo}
						alt="logo"
						className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
					/>
				</div>

				{/* nav links */}
				<nav className="flex items-center gap-8">
					{[
						{ href: "/", label: "صفحه اصلی" },
						{ href: "/products", label: "محصولات" },
						{ href: "/contact-us", label: "تماس با ما" },
						{ href: "/aboat-us", label: "درباره ما" },
					].map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-slate-600 hover:text-blue-600 hover:underline text-base md:text-lg transition-all"
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* icons */}
				<div className="flex items-center gap-3">
					{[
						{ icon: <GoSearch />, href: "#" },
						{ icon: <BsBasket3 />, href: "/cart" },
						{ icon: <IoPersonOutline />, href: adminHref },
					].map(({ icon, href }, i) => (
						<Link
							key={i}
							href={href}
							className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-md text-xl hover:bg-blue-200 transition-all"
						>
							{icon}
						</Link>
					))}
				</div>
			</header>

			{/* ---------- Header (Mobile) ---------- */}
			<header className="sm:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 flex items-center justify-between px-4 py-3">
				<Image
					src={logo}
					alt="logo"
					className="w-12 h-12 object-contain"
				/>
				<Link
					href="/"
					className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-md text-xl"
				>
					<GoSearch />
				</Link>
			</header>

			{/* ---------- Bottom Navigation (Mobile) ---------- */}
			<motion.nav
				initial={{ y: 80 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.3 }}
				className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] 
	flex justify-around items-center py-2 z-50"
			>
				{[
					{ href: "/", label: "خانه", icon: <GoHome /> },
					{ href: "/products", label: "محصولات", icon: <MdOutlineProductionQuantityLimits /> },
					{ href: "/cart", label: "سبد خرید", icon: <BsBasket3 /> },
					{ href: "/about-us", label: "درباره", icon: <GoSearch /> },
				].map(({ href, label, icon }) => {
					const isActive = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							className={`flex flex-col items-center justify-center transition-all ${isActive ? "text-blue-600" : "text-slate-500 hover:text-blue-500"
								}`}
						>
							<span className={`text-2xl ${isActive ? "scale-110" : "scale-100"} transition-transform`}>
								{icon}
							</span>
							<span className="text-[0.75rem] font-medium mt-1">{label}</span>
						</Link>
					);
				})}
			</motion.nav>

			{/* ---------- Space for bottom nav ---------- */}
			<div className="sm:hidden h-14"></div>
		</>
	);
}
