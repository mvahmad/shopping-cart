"use client"
import { logout } from "@/lib/actions/auth";
import { Button } from "@nextui-org/react";
export default function SignOutButton (){
    return(
        <Button onPress={()=>logout()}>sign Out</Button>
    )
}