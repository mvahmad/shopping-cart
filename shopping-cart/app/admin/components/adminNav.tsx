// shopping-cart/app/admin/components/adminNav.tsx
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FiSquare } from "react-icons/fi";
import { FiClipboard } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";

interface Props {
	isOpen: boolean
	onCartIconClick: () => void
}

const AdminNav = ({isOpen, onCartIconClick}:Props) => {
    return (  
          <aside className={`bg-white py-4 w-1/5 flex-col items-center overflow-y-auto shadow-lg 
      ${isOpen ? "hidden" : "flex"}
    `}>
            <nav className='flex flex-col space-y-4'>
               <Link href="/admin/dashboard" className="text-gray-700 flex gap-2 items-center text-lg
                  hover:text-blue-500 hover:border-r-4 border-blue-700 px-3 py-2
                  bg-gradient-to-r hover:from-slate-50 hover:to-blue-200
                  "> 
               <FiSquare className="inline-block" />
               <span>نمای کلی</span>
               </Link>
               <Link href="/admin/orders" className="text-gray-700 flex gap-2 items-center text-lg
                  hover:text-blue-500 hover:border-r-4 border-blue-700 px-3 py-2
                  bg-gradient-to-r hover:from-slate-50 hover:to-blue-200">
                  <FiClipboard className="inline-block" />
                  <span>سفارشات</span>
                  </Link>
               <Link href="/admin/products" className="text-gray-700 flex gap-2 items-center text-lg
                  hover:text-blue-500 hover:border-r-4 border-blue-700 px-3 py-2
                  bg-gradient-to-r hover:from-slate-50 hover:to-blue-200">
                     <FiInbox className="inline-block" />
                     <span>محصولات</span>
                  </Link>
               <Link href="/admin/info" className="text-gray-700 flex gap-2 items-center text-lg
                  hover:text-blue-500 hover:border-r-4 border-blue-700 px-3 py-2
                  bg-gradient-to-r hover:from-slate-50 hover:to-blue-200">
                     <FiUser className="inline-block" />
                     <span>اطلاعات کاربران</span>
                  </Link>
               <Link href="/admin/massages" className="text-gray-700 flex gap-2 items-center text-lg
                  hover:text-blue-500 hover:border-r-4 border-blue-700 px-3 py-2
                  bg-gradient-to-r hover:from-slate-50 hover:to-blue-200">
                     <FiMessageSquare className="inline-block" />
                     <span>پیام ها</span>
                  </Link>

                  <Button onPress={onCartIconClick}>بستن</Button>
            </nav>
            <div>
                  
            </div>
    </aside>

         
   
  
    );
}
 
export default AdminNav;