import { Footer, Header } from "../cart/import";

export default function page(){
    return<>
    <Header/>
        <section className="p-3 m-2 rounded-2xl border-1 border-slate-200 
        flex flex-col justify-center items-center shadow-sm ">
            <p className="text-slate-500 font-semibold max-w-[25rem] " >تیم ما در تلاش است با ارائه بهترین لباس های ورزشی دنیا با بهترین کیفت در جنوب کشور خرید لباس ورزشی را آسان و لذت بخش کند.
            </p>
            
        </section>
    <Footer/>
    </>
}