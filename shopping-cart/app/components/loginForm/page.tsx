"use client"
import  Login from "@/app/lib/actions/action"
import SignInButton from "@/app/admin/components/signInButton"
import { Button, Input } from "@nextui-org/react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"

const initialValue:any = {password:"" , email:""}


export default function LoginForm (){

    const [state , loginAction] = useActionState(Login ,initialValue,"my-action")

    return(
   
    <form action={loginAction} className="flex w-[25rem] h-full  p-5 flex-col gap-2 border-1 rounded-md bg-white ">
          <h1 className="text-2xl font-bold ">Login</h1>
        <div className="flex flex-col gap-2">
            <Input id="email" name="email" placeholder="Email" />
        {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
        </div>
    

      <div className="flex flex-col gap-2">
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
      </div>
      <SubmitButton />
      <SignInButton />
    </form>
        
    )
}

function SubmitButton (){
    const {pending} = useFormStatus()

    return(
    <Button disabled={pending} type="submit"> 
       Login
    </Button>)
}