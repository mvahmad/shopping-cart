// shopping-cart/app/admin/components/adminNav.tsx
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FiSquare } from "react-icons/fi";
import { FiClipboard } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa"

interface Props {
	isOpen: boolean
	onCartIconClick: () => void
}

const AdminNav = ({isOpen, onCartIconClick}:Props) => {
    return (  
          <aside className={`bg-white py-4 w-1/5 flex-col items-center justify-between overflow-y-auto shadow-lg 
      ${isOpen ? "hidden" : "flex"}
    `}>
            <div className="flex flex-col items-center gap-2 p-2 justify-center">
               <img alt="admin" className="w-[5rem] h-[5rem]"
                src={"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"}
                 />
                 <span className="text-slate-800 font-normal text-[1rem] ">علی عطاری</span>
                 <span className="font-semibold text-red-500 text-[0.875rem]">مدیریت سایت</span>
            </div>
            <nav className='flex flex-col space-y-1 w-webkit-fill'>
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

                  
            </nav>
            <div className="flex items-end h-full justify-start w-webkit-fill p-2 m-1">
               <button className="flex items-center hover:text-red-300 text-red-500">
               <FaSignOutAlt />
               <span>خروج</span>
            </button>
            </div>
         
            
            <div>
                  
            </div>
    </aside>

         
   
  
    );
}
 
export default AdminNav;