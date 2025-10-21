import Link from "next/link";
import { Footer, Header } from "../cart/import";

export default function page(){
    return<>
    <Header/>
        <section className="p-3 m-2 rounded-2xl border-1 border-slate-200 
        flex flex-col justify-center items-start shadow-sm ">
            <Link href={'https://github.com/mvahmad/shopping-cart'} className="font-semibold">GitHub</Link>
            <Link href={"https://www.linkedin.com/in/ahmad-movahedi-31b986265/"} className="font-semibold">Linkdin</Link>
            
        </section>
    <Footer/>
    </>
}