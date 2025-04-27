import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import FooterButton from "./footerButton";
function Footer() {
    return ( 
    <footer className='flex flex-col'>
          <section className="bg-[#F1F5F9D9]" >
                <div className="flex items-center justify-between pt-4 w-full px-[10px] tablet:px-[50px]">
                    <div className="flex flex-col">
                    <div className="flex  items-center gap-3 w-full h-full px-2 py-2 text-center">
                        <Link href="/"><Image src={logo} alt="logo" 
                        className="w-16 h-16" /></Link>
                        <h1 className="text-[1.5rem] font-bold text-blue-600">الیت اسپورت</h1>
                    </div>
                        <div className="rounded-lg border-none m-auto p-3 h-[11.187rem] w-[21.87rem]
                         text-gray-600 bg-[#E2E8F099] ">
                        لورم ایپسوم متن ساختگی
                         با تولید سادگی نامفهوماز صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بل 
                         روزنامه و مجله در ستون و سطرآنچنان که لازم است و براشرایطلورم ایپسوم متن ساختگی با تولید    
                        </div>
                    </div>
                   
                    <div className="flex flex-col justify-end ">
                        <h1 className="text-[1.5rem] font-bold text-blue-600"> دسترسی سریع</h1>
                        <div className="flex flex-col gap-2 pt-6 h-[11.187rem]">
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
                    
                    <div className="flex flex-col justify-end ">
                        <h1 className="text-[1.5rem] font-bold text-blue-600">نمادها</h1>
                        <div className="flex flex-col gap-2  h-[11.187rem]">
                          
                        </div>
                    </div>

                </div>

                <div></div>
          </section>

          <section>lisence</section>
    </footer> );
}

export default Footer;