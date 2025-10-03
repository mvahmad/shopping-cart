"use client";
import Cookies from "js-cookie";
import Row from "../Row/Row";
import { Button } from "@nextui-org/react";

interface Props {
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  linkDiscription:string
  handelClick:()=>void
}

const toman = (v: number) =>
  new Intl.NumberFormat("fa-IR").format(v) + " تومان";

export default function SummaryCard({
  subtotal,
  discount,
  shippingCost,
  total,
  linkDiscription,
  handelClick
}: Props) {
  const token = Cookies.get("accessToken")
  // const handleSubmit = () => {
  //   // Store the values as an array of key-value objects
  //   const summary = [
  //     { key: "subtotal", value: subtotal },
  //     { key: "discount", value: discount },
  //     { key: "shippingCost", value: shippingCost },
  //     { key: "total", value: total },
  //   ];

  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("orderSummary", JSON.stringify(summary));
  //   }
  // };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h4 className="mb-4 text-lg font-extrabold text-slate-900">
        خلاصه سفارش
      </h4>
      <div className="space-y-2 text-sm">
        <Row label="جمع جزء" value={toman(subtotal)} />
        <Row
          label="تخفیف"
          value={discount ? `− ${toman(discount)}` : toman(0)}
          muted={!discount}
        />
        <Row
          label="ارسال"
          value={shippingCost ? toman(shippingCost) : "رایگان"}
        />
      </div>
      <div className="my-3 h-px bg-slate-100" />
      <Row
        label={<span className="font-extrabold">مبلغ قابل پرداخت</span>}
        value={<span className="font-extrabold">{toman(total)}</span>}
      />
        <Button
          onPress={handelClick}
          className="mt-4 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm 
          font-extrabold text-white shadow hover:bg-blue-700"
          isDisabled={token ? false : true }
        >
          {token ? linkDiscription : "برای ادامه فرآیند خرید وارد شوید"}
        </Button>
      <p className="mt-2 text-center text-xs text-slate-500">
        پرداخت امن • بازگشت وجه تا ۷ روز
      </p>
    </div>
  );
}
