"use client"
import PeymentForm from "@/app/components/paymentForm/paymentForm";
import { Footer, Header } from "../product/import";
import { SummaryCard } from "../cart/import";

export default function Peyment(){  
    const total = localStorage.getItem("total")
    const discount = localStorage.getItem("discount")
    const shippingCost = localStorage.getItem("shippingCost")
    const subtotal = localStorage.getItem("subtotal")
    return(
    <>
        <Header />
            <main dir="rtl" className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white">
                <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
                    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">نهایی کردن خرید</h1>
                                <p className="mt-1 text-sm text-slate-500">کیت‌های منتخب شما برای تسویه آماده‌اند.</p>
                         </div>
                    </header>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <section className="lg:col-span-8">
                            <div className="divide-y divide-slate-100 rounded-3xl border border-slate-200 bg-white p-6">
                                 <PeymentForm/>
                            </div>
                        </section>
                            <aside className="lg:col-span-4">
                                <SummaryCard  
                                    discount={discount as unknown as number}
                                    shippingCost={shippingCost as unknown as number}
                                    subtotal={subtotal as unknown as number}
                                    total={total as unknown as number}
                                    link={'#'}
                                />
                            </aside>
                        
                    </div>
                </div>    
            </main>
        <Footer />
    </>
    )
   
}