"use client"
import { Button } from "@nextui-org/react"
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentResultPage (){
   const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("status");
   
    return(
    <section className="flex flex-col items-center p-10 justify-center">
        <h1 className="text-3xl font-bold" >درگاه پرداخت</h1>
        {paymentStatus === "success" ? (
            <>
                <p className="text-green-600 mt-4">پرداخت با موفقیت انجام شد!</p> 
                <p className="mt-2">از خرید شما متشکریم.</p>
            </>
        ) : (
            <>
                <p className="text-red-600 mt-4">پرداخت ناموفق بود. لطفا دوباره تلاش کنید.</p>
            </>
        )}
        <Link href='/'>
            <Button className="mt-6" color="primary">بازگشت به صفحه اصلی</Button>
        </Link>
        
        
    </section>
    )
}