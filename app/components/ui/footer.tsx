import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import FooterButton from "./footerButton";
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
function Footer() {
    return ( 
    <footer className='flex flex-col'>
          <section className="bg-[#F1F5F9D9] " >
                <div className="flex flex-row items-center  justify-between gap-8 px-8 max-[765px]:flex-col w-auto">

                    <div className="flex flex-col w-[21.03rem] max-[765px]:w-auto">
                        <div className="flex  items-center gap-3 w-full h-full px-2 py-2 text-center">
                            <Link href="/"><Image src={logo} alt="logo" 
                            className="w-16 h-16" /></Link>
                            <h1 className="text-[1.5rem] font-bold text-blue-600">الیت اسپورت</h1>
                        </div>
                        <div className="rounded-lg border-none m-auto p-3 h-auto 
                         text-gray-600 bg-[#E2E8F099] w-auto ">
                        لورم ایپسوم متن ساختگی
                         با تولید سادگی نامفهوماز صنعت چاپ 
                         و با استفاده از طراحان گرافیک است. چاپگرها و متون بل 
روزنامه و مجله در ستون و
                          سطرآنچنان که لازم است و براشرایطلورم ایپسوم متن ساختگی با تولید    
                        </div>
                    </div>
                   
                   <div className="flex flex-row max-[765px]:flex-col gap-12 justify-between max-[765px]:w-full w-[36rem]">
                    <div className="flex flex-col justify-end ">
                            <h1 className="text-[1.5rem] font-bold text-blue-600 "> دسترسی سریع</h1>
                            <div className="flex flex-col gap-2  h-[11.187rem] pt-6">
                                <FooterButton href="/" >خانه</FooterButton>
                                <FooterButton href="#" >محصولات جدید</FooterButton>
                                <FooterButton href="#" >حراج ویژه</FooterButton>
                            </div>  
                        </div>
                        
                        <div className="flex flex-col justify-end ">
                            <h1 className="text-[1.5rem] font-bold text-blue-600">راهنما</h1>
                            <div className="flex flex-col gap-2 pt-6 h-[11.187rem]">
                                <FooterButton href="/" >شرایط بازگشت</FooterButton>
                                <FooterButton href="#" >راهنمای سایز</FooterButton>
                                <FooterButton href="/contact-us" > تماس با ما</FooterButton>
                            </div>
                        </div>
                        
                        <div className="flex  flex-col justify-end ">
                            <h1 className="text-[1.5rem] font-bold text-blue-600">نمادها</h1>
                            <div className="flex flex-col max-[765px]:flex-row gap-2 items-center justify-center pt-6 ">
                            <Link href={'#'} className="rounded-lg border-none p-2  h-12 w-12
                            text-gray-600 bg-[#E2E8F099] 
                            flex justify-between items-center" ></Link>
                            <Link href={'#'} className="rounded-lg border-none p-2  h-12 w-12
                            text-gray-600 bg-[#E2E8F099] 
                            flex justify-between items-center" ></Link>
                            <Link href={'#'} className="rounded-lg border-none p-2  h-12 w-12
                            text-gray-600 bg-[#E2E8F099] 
                            flex justify-between items-center" ></Link>
                            </div>
                        </div>
                        
                   </div>
                    

                </div>

                <div className="flex max-[713px]:flex-col flex-row gap-2 items-center justify-between py-4 px-[10px] ">
                    <div className="flex items-center gap-2 max-[713px]:flex-col flex-row text-center">
                        <div className="rounded-lg border-none p-2
                        text-gray-600 bg-[#E2E8F099] 
                        flex justify-between gap-2 items-center">
                            <span className="w-[8rem]">پست الکترونیک:</span>
                            <span className="">
                            Elite.Sport2024@gmail.com
                            </span>
                        </div>
                        <span className="rounded-lg border-none p-2 w-full
                        text-gray-600 bg-[#E2E8F099] 
                        flex justify-between items-center">
                            <span >شماره تماس:</span>
                            <span className="">021-12345678</span>
                        </span>
                    </div>
                    <div className="flex items-center justify-end gap-2 text-center">
                        <Link href={'#'} className="rounded-lg border-none p-2  h-12 w-12
                        text-gray-600 text-2xl bg-[#E2E8F099] 
                        flex justify-center items-center" >
                            <FaInstagram />
                        </Link>
                         <Link href={'#'} className="rounded-lg border-none p-2  h-12 w-12
                        text-gray-600 bg-[#E2E8F099] 
                        flex justify-center text-2xl items-center" >
                            <FaTelegramPlane />
                        </Link>
                    </div>
                </div>
          </section>

          <section className="bg-blue-800 flex items-center min-w-fit justify-center p-4">
            <div className="text-gray-100 rounded-md bg-blue-600 p-2 flex ">
                <span className="p-1"> 
                    <IoAlertCircleOutline />
                </span>
            کلیه حقوق این وب سایت متعلق به تیم الیت اسپورت می‌باشد.
            </div>
          </section>
    </footer> );
}

export default Footer;