import { Button, Input } from "@nextui-org/react"
import { RegisterFormData, schema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostServices } from "@/app/hooks/usePostServices";
import { postRegisterData } from "@/auth";
const formInputs=[
    {"name":"firstname" , "type":"text" , "className":"" , "placeHolder":"First Name" ,"vlaue":""},
    {"name":"username" , "type":"text" , "className":"" , "placeHolder":"User Name","vlaue":""},
    {"name":"lastname" , "type":"text" , "className":"" , "placeHolder":"Last Name","vlaue":""},
    {"name":"pssword" , "type":"text" , "className":"" , "placeHolder":"Password","vlaue":""},
    {"name":"addres" , "type":"text" , "className":"" , "placeHolder":"Addres","vlaue":""},
    {"name":"phonenumber" , "type":"number" , "className":"" , "placeHolder":"Phon Number","vlaue":""},
]
export default function SignUpForm(){

    const {
        handleSubmit,
        formState: { errors },
        register,
        reset,
    } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

    const { mutate, isPending } = usePostServices({
    mutationFn: postRegisterData,
    mutationKey: ["Register"],
  });



    return(
        <form className="flex w-[25rem] h-full my-2 p-5 flex-col gap-2 border-1 rounded-md bg-white ">
            <h1 className="text-2xl font-bold">Sign UP</h1>
            {formInputs.map((input,index)=>{
                return(
                    <Input key={index} name={input.name} 
                    placeholder={input.placeHolder} 
                    className={input.className}
                    value={input.vlaue}
                    type={input.type} 
                    />
                )
            })
            }
            <Button>Sign Up</Button>
        </form>
    )
}


