"use server"
import { auth } from "@/auth"
import { Image } from "@nextui-org/react";
export default async function UserInfo(){
    const session =await auth()
    return(
        <section className="">
            <div>Next Auth v5 and Next js v15</div>
            <p>user sign in with name:{session?.user?.name} </p>
            <p>user sign in with email:{session?.user?.email} </p>

            {session?.user?.image && 
            <Image src={session?.user?.image}
            alt={session?.user?.name || "Avatar"} width={48} height={48} 
            />
            }
        </section>
    )


}