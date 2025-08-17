"use client"
import { logoutGithub } from "@/app/lib/actions/auth";
import { Button } from "@nextui-org/react";
export default function SignOutButton (){
    return(
        <Button onPress={()=>logoutGithub()}>sign Out</Button>
    )
}