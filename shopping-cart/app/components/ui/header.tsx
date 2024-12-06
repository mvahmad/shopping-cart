import { useCartStore} from "@/app/store/useCartStore";
import useFromStore from "@/app/hooks/useFromStore"
import { FiShoppingCart } from "react-icons/fi"
import { IoPerson } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem} from "@nextui-org/dropdown";
export interface Props {
  onCartOnClick: () => void
   }
 
   
export default function Heder ({onCartOnClick}: Props){
  const cart = useFromStore(useCartStore, state => state.cart)
    return (
      <header className='bg-white pt-7 flex  items-center justify-center h-[7rem] sticky top-0 z-10'>
		
			<nav className='container text-[#ff7900] md:w-11/12 px-4 flex flex-col justify-end'>
			<div className="flex justify-center md:justify-between items-center">
				<div className="flex gap-5">
					<div className="flex md:justify-between justify-center items-center gap-5">
						<Link href={'/'} className='md:text-3xl md:flex hidden text-2xl font-semibold'>
							Shop Cart
						</Link>

					</div>
					<div className="px-3 rounded-2xl md:flex hidden  items-center w-[25rem]  text-black shadow-lg gap-2">
							<span className="md:text-2xl text-lg">
								<IoSearchOutline />
							</span>
							<input
								className="focus:outline-none"
								placeholder="Search..."
							
							/>
					</div>
				</div>

				<div className='flex justify-between gap-4 text-black'>
					<Button
						type='button'
						className='bg-slate-100 text-black rounded-md text-xl md:block hidden'
					>
						<Link className="flex items-center justify-between gap-3" href={'./login'} >
							<IoPerson />
						<span className="text-lg">Login / Sign up</span>
						</Link>
					</Button>
					<Link 
						href={'/'} 
						className='flex md:hidden text-3xl text-[#ff7900] border-slate-200
						rounded-md p-2 border-2  font-semibold'>
							Shop Cart
					</Link>
					<Button
						type='button'
						title='Mini Cart'
						className='text-xl md:flex hidden items-center'
						onClick={onCartOnClick}
					>
							<FiShoppingCart />
						<div className=' rounded-full bg-[#ff7900] w-5 h-5 text-sm -ml-1'>{cart?.length}</div>
					</Button>
				</div>
			</div>
			
			<div className="md:flex hidden gap-3 pt-3 pb-2 ">
			<Dropdown>
				<DropdownTrigger>
					<Button className="text-lg text-black flex gap-1 rounded-sm px-1">
						<BiCategoryAlt />
						<span>Categories</span>
					</Button>
				</DropdownTrigger>
				<DropdownMenu className="rounded-md bg-slate-50 p-4 active:shadow-xl" aria-label="Static Actions">
					<DropdownItem key="new">New 1</DropdownItem>
					<DropdownItem key="copy">new 2</DropdownItem>
					<DropdownItem key="edit">new 3</DropdownItem>
					<DropdownItem key="delete" className="text-danger" color="danger">
					Delete file 
					</DropdownItem>
				</DropdownMenu>
    		</Dropdown>
			<Dropdown>
				<DropdownTrigger>
					<Button className="text-lg text-black flex gap-1 rounded-sm px-1">
						<span>New Products</span>
					</Button>
				</DropdownTrigger>
				<DropdownMenu className="rounded-md bg-slate-50 p-4 active:shadow-xl" aria-label="Static Actions">
					<DropdownItem key="new">New 1</DropdownItem>
					<DropdownItem key="copy">new 2</DropdownItem>
					<DropdownItem key="edit">new 3</DropdownItem>
					<DropdownItem key="delete" className="text-danger" color="danger">
					Delete file 
					</DropdownItem>
				</DropdownMenu>
    		</Dropdown>
			</div>

			</nav>
		</header>
        )

}