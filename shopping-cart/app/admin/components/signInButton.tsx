"use client"
import { login } from "@/lib/actions/auth";
import { Button } from "@nextui-org/react";
export default function SignInButton (){
    return(
        <Button onPress={()=>login()}>sign in with github</Button>
    )
}