import Link from "next/link";
import { GoPerson } from "react-icons/go";
import { LuChartSpline } from "react-icons/lu";
import { LuCrown } from "react-icons/lu";
import { AiOutlineDollar } from "react-icons/ai";
const AboutSection = () => {
    return (
         <section className="about-section bg-[url('../public/about.jpg')] bg-cover 
         bg-center flex justify-between items-center p-4 text-white w-full h-[24.375rem]">
                <div className="flex flex-col items-start  justufy-between">
                        <h1 className="text-2xl font-bold mb-4">الیت اسپورت</h1>
                        <p className="min-[763px]:text-lg text-base text-center min-[763px]:w-[30rem] w-auto ">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                         چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز
                        .و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،  
                        </p>
                        <div className="flex justify-end w-webkit-fill mt-3">
                        <Link href={'/about'} className="bg-inherit text-white border-2 border-white rounded-md
                        px-4 py-2 mt-4 hover:bg-white hover:text-black transition duration-300 ease-in-out">
                                اطلاعات بیشتر
                       </Link>
                        </div>
                      
                </div>
                <div className="min-[763px]:grid grid-cols-2 hidden items-center gap-4">
                        <div className="flex flex-col items-center justify-center gap-1 p-3 text-white">
                                <GoPerson size={40}/>
                                <span>پرسنلی مجرب وحرفه ای</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 p-3 text-white">
                                <LuChartSpline size={40} />
                                <span>کیفت بالای محصولات</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 p-3 text-white">
                                <LuCrown size={40} />
                                <span>کیت های خاص</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 p-3 text-white">
                                <AiOutlineDollar size={40} />
                                <span>مقرون به صرفه</span>
                        </div> 
                        
                </div>
        </section>
        );
}
 
export default AboutSection;