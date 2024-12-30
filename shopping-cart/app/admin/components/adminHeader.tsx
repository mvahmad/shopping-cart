import { Button } from "@nextui-org/react";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
const AdminHeader = () => {
    return (  
         <header className='bg-white pt-3 pb-4 flex  items-center justify-center md:h-[7rem] sticky top-0 z-10'>
            <nav className='container text-[#ff7900] md:w-11/12 px-4 flex flex-col justify-end'>
                <div className="flex justify-center md:justify-between items-center">
                    <div className="flex gap-3">
                        <div className="flex md:justify-between justify-center items-center gap-5">
                            <Link href={'/'} className='md:block hidden text-2xl lg:text-3xl font-semibold'>
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
                    <div className="flex">
                        <Button><Link href='/admin'>Products</Link></Button>
                        <Button><Link href='/admin/orders'>Orders</Link></Button>
                        <Button><Link href='/admin/inventory'>Inventory</Link></Button>
                    </div>
                
                </div>
            </nav>
    </header> 
    );
}
 
export default AdminHeader;