'use client'
import { BsBasket3 } from "react-icons/bs";
import logo from "@/public/logo.png"
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import Image from "next/image"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
export interface Props {
	onCartOnClick: () => void
}


export default function Heder() {

	const accessToken = Cookies.get('accessToken');
	const [adminHref, setAdminHref] = useState<string>('/login')
	useEffect(() => {
		if (accessToken) {
			setAdminHref('/admin')
		}
	}, [accessToken])

	return (
		<header className='[Elite-Sport-Header] sticky top-0 flex sm:flex-row flex-col items-center justify-between
		 bg-white shadow-md py-4 px-4 md:px-10 lg:px-20 gap-2 z-40'>
			<div className="[icone]">
				<Image src={logo} alt="logo" className="sm:w-[4.68rem] sm:h-[4.68rem] w-[4rem] h-[4rem]" />
			</div>
			<nav className="flex items-center gap-6 flex-wrap">
				<Link href={'/'} className="hover:font-bold hover:text-blue-600 
					hover:underline text-[#1E293B99] font-normal text-base md:text-xl max-sm:text-[0.7rem]" >صفحه اصلی</Link>
				<Link href={'/products'} className="hover:font-bold hover:text-blue-600 
					hover:underline text-[#1E293B99] font-normal text-base md:text-xl max-sm:text-[0.7rem]">محصولات</Link>
				<Link href={'/contact-us'} className="hover:font-bold hover:text-blue-600 
					hover:underline text-[#1E293B99] font-normal text-base md:text-xl max-sm:text-[0.7rem]">تماس با ما</Link>
				<Link href={'/aboat-us'} className="hover:font-bold hover:text-blue-600 
					hover:underline text-[#1E293B99] font-normal text-base md:text-xl max-sm:text-[0.7rem]">درباره ما</Link>
			</nav>
			<div className="sm:flex hidden justify-between gap-3 items-center mt-4 md:mt-0">
				<Link href={"#"}
					className="relative flex items-center justify-center
				 w-[2.5rem] h-[2.5rem] bg-blue-200
				 rounded-md text-blue-600 transition-all text-[20px] md:text-[24px] font-bold ">
					<GoSearch />
				</Link>
				<Link href={"/cart"}
					className="relative flex items-center justify-center
				 w-[2.5rem] h-[2.5rem] bg-blue-200
				 rounded-md text-blue-600 transition-all text-[20px] md:text-[24px] font-bold">
					<BsBasket3 />
				</Link>
				<Link href={adminHref}
					className="relative flex items-center justify-center
				 w-[2.5rem] h-[2.5rem] bg-blue-200
				 rounded-md text-blue-600 text-[20px] md:text-[24px] font-bold ">
					<IoPersonOutline />
				</Link>
			</div>

		</header>
	)

}