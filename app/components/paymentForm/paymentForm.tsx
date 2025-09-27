"use client"
import { useCartStore } from "@/app/store/useCartStore";
import { Button, Input } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const inputItems = [
    {"label":"نام خریدار" , "name": "firstName", "className":"","id":"1"},
    {"label":"نام خانوادگی" ,"name": "lastName", "className":"","id":"2"},
    {"label":"شماره تماس" , "name": "phoneNumber", "className":"[640px]:col-start-3 [640px]:col-end-5","id":"3"},
    {"label":"آدرس تحویل سفارش" , "name": "address", "className":"[640px]:col-start-1 [640px]:col-end-4","id":"4"},
]

const PeymentForm = ()=>{
    const cart = useCartStore((state)=>state.cart)

    const {
        handleSubmit,

        control,
        reset
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
        },
  });

   useEffect(() => {
    const user = Cookies.get("userInfo");
    if (user) {
      const parsed = JSON.parse(user);
      reset({
        firstName: parsed.firstname || "",
        lastName: parsed.lastname || "",
        phoneNumber: parsed.phoneNumber || "",
        address: parsed.address || "",
      });
    }
  }, []);

  function handleSubmitBill(value:{
          firstName: string,
          lastName: string,
          phoneNumber: string,
          address: string,}
  ){
      
  }


    return(
    <form
      className="grid grid-cols-1 min-[490px]:grid-cols-2 gap-3 px-8"
// 
    >
        {inputItems.map((item)=>{
            return(
                <Controller 
                key={item.id}
                name={item.name as "firstName" | "lastName" | "phoneNumber" | "address"}
                control={control}
                render={({field})=>{
                    return(
                          <Input
                            {...field}
                            label={item.label}
                            className={`w-full ${item.className}`}
                            isReadOnly
                            variant="bordered"
                            labelPlacement={"outside"}
                            />
                    )
                }}
                />
            )
        })}
        {/*  */}
    </form>
    )
}
export default PeymentForm