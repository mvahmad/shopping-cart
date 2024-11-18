import { useCartStore} from "@/app/store/useCartStore";
import useFromStore from "@/app/hooks/useFromStore"
import { FiShoppingCart } from "react-icons/fi"
import { MdOutlineManageAccounts } from "react-icons/md";
import Link from "next/link";
export interface Props {
  onCartOnClick: () => void
   }
 
   
export default function Heder ({onCartOnClick}: Props){
  const cart = useFromStore(useCartStore, state => state.cart)
    return (
      <header className='bg-gray-900 text-white py-4 flex items-center justify-between h-14 sticky top-0 z-10'>
			<nav className='container mx-auto md:w-10/12 px-4 flex justify-between'>
			<div className="flex justify-between items-center gap-5">
				<span className='text-lg font-semibold'>
					Shop Cart
				</span>
				<div>Categories</div>
			</div>
				<div className='flex gap-4'>
					<button
						type='button'
						title='Mini Cart'
						className='text-white text-xl flex items-center'
						onClick={onCartOnClick}
					>
						<FiShoppingCart />
						<div className='text-white rounded-full bg-blue-700 w-5 h-5 text-sm -ml-1'>{cart?.length}</div>
					</button>
					<button
						type='button'
						title='Admin'
						className='text-white text-xl flex items-center'
					>
						<Link href={'./admin/home'} >
							<MdOutlineManageAccounts />
						</Link>
					</button>
				</div>
			</nav>
		</header>
        )

}