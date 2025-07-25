"use client"
import { loginGithub } from "@/app/lib/actions/auth";
import { Button } from "@nextui-org/react";
export default function SignInButton (){
    return(
        <Button onPress={()=>loginGithub()}>sign in with github</Button>
    )
}