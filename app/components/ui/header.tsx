// 'use client'
// import { BsBasket3 } from "react-icons/bs";
// import logo from "@/public/logo.png"
// import Link from "next/link";
// import { GoSearch } from "react-icons/go";
// import { IoPersonOutline } from "react-icons/io5";
// import Image from "next/image"
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// export interface Props {
// 	onCartOnClick: () => void
// }


// export default function Header() {

// 	const accessToken = Cookies.get('accessToken');
// 	const [adminHref, setAdminHref] = useState<string>('/login')
// 	useEffect(() => {
// 		if (accessToken) {
// 			setAdminHref('/admin')
// 		}
// 	}, [accessToken])

// 	return (
// 		<header className='[Elite-Sport-Header] sticky top-0 flex sm:flex-row flex-col items-center justify-between
// 		 bg-white shadow-md py-4 px-4 md:px-10 lg:px-20 gap-2 z-40'>
// 			<div className="[icone]">
// 				<Image src={logo} alt="logo" className="sm:w-[4.68rem] sm:h-[4.68rem] w-[4rem] h-[4rem]" />
// 			</div>
// 			<nav className="flex items-center gap-6 flex-wrap">
// 				<Link href={'/'} className="hover:font-bold hover:text-blue-600 
// 					hover:underline text-[#1E293B99] font-normal text-base md:text-xl max-sm:text-[0.7rem]" >صفحه اصلی</Link>
// 				<Link href={'/products'} className="hover:font-bold hover:text-blue-600 
// 					hover:underline text-[#1E293B99] font-normal text-base md:text-xl max-sm:text-[0.7rem]">محصولات</Link>
// 				<Link href={'/contact-us'} className="hover:font-bold hover:text-blue-600 
// 					hover:underline text-[#1E293B99] font-normal text-base md:text-xl max-sm:text-[0.7rem]">تماس با ما</Link>
// 				<Link href={'/aboat-us'} className="hover:font-bold hover:text-blue-600 
// 					hover:underline text-[#1E293B99] font-normal text-base md:text-xl max-sm:text-[0.7rem]">درباره ما</Link>
// 			</nav>
// 			<div className="sm:flex hidden justify-between gap-3 items-center mt-4 md:mt-0">
// 				<Link href={"#"}
// 					className="relative flex items-center justify-center
// 				 w-[2.5rem] h-[2.5rem] bg-blue-200
// 				 rounded-md text-blue-600 transition-all text-[20px] md:text-[24px] font-bold ">
// 					<GoSearch />
// 				</Link>
// 				<Link href={'#'}
// 					className="relative flex items-center justify-center
// 				 w-[2.5rem] h-[2.5rem] bg-blue-200
// 				 rounded-md text-blue-600 transition-all text-[20px] md:text-[24px] font-bold">
// 					<BsBasket3 />
// 				</Link>
// 				<Link href={adminHref}
// 					className="relative flex items-center justify-center
// 				 w-[2.5rem] h-[2.5rem] bg-blue-200
// 				 rounded-md text-blue-600 text-[20px] md:text-[24px] font-bold ">
// 					<IoPersonOutline />
// 				</Link>
// 			</div>
// 		</header>
// 	)

// }

"use client"
import Image from "next/image";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { BsBasket3 } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { motion } from "framer-motion";
import logo from "@/public/logo.png"
import { usePathname } from "next/navigation";

export default function Header({ adminHref = "#" }) {
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
						{ icon: <BsBasket3 />, href: "#" },
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
					href="#"
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
					{ href: "/products", label: "محصولات", icon: <BsBasket3 /> },
					{ href: "/contact-us", label: "تماس", icon: <IoPersonOutline /> },
					{ href: "/aboat-us", label: "درباره", icon: <GoSearch /> },
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
