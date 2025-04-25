'use client'
import { BsBasket3 } from "react-icons/bs";
import logo from "@/public/logo.png"
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import Image from "next/image"
export interface Props {
  onCartOnClick: () => void
   }

export default function Heder ({onCartOnClick}: Props){

    return (
      	<header className='[Elite-Sport-Header] flex items-center justify-between
		 bg-white shadow-md py-4 px-4 md:px-10 lg:px-20'>
			<div className="[icone]">
			<Image src={logo} alt="logo" className="w-[4.68rem] h-[4.68rem]" />
			</div>
				<nav className="flex items-center gap-6">
					<Link href={'#'}className="hover:font-bold hover:text-blue-600 
					hover:underline text-[#1E293B99] font-normal text-xl" >صفحه اصلی</Link>
					<Link href={'#'} className="hover:font-bold hover:text-blue-600 
					hover:underline text-[#1E293B99] font-normal text-xl">محصولات</Link>
					<Link href={'#'} className="hover:font-bold hover:text-blue-600 
					hover:underline text-[#1E293B99] font-normal text-xl">تماس با ما</Link>
					<Link href={'#'} className="hover:font-bold hover:text-blue-600 
					hover:underline text-[#1E293B99] font-normal text-xl">درباره ما</Link>
				</nav>
			<div className="flex justify-between gap-3 items-center">
				<Link href={"#"}
				className="relative flex items-center justify-center
				 w-[2.5rem] h-[2.5rem] bg-blue-200
				 rounded-md text-blue-600 transition-all text-[24px] font-bold ">
				<GoSearch />
				</Link>
				<Link href={'#'}
				className="relative flex items-center justify-center
				 w-[2.5rem] h-[2.5rem] bg-blue-200
				 rounded-md text-blue-600 transition-all text-[24px] font-bold">
				<BsBasket3 />
				</Link>
				<Link href={'#'} 
				className="relative flex items-center justify-center
				 w-[2.5rem] h-[2.5rem] bg-blue-200
				 rounded-md text-blue-600 text-[24px] font-bold ">
				<IoPersonOutline />
				</Link>
			</div>
	
		</header>
        )

}