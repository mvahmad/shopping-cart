"use client"
import type { ReactNode } from "react"
import { Button} from "@nextui-org/react";
import AdminNav from "../components/adminNav";
import { useState } from "react";

export default function AdminDashboard (
  {children , Id}:
  {children:ReactNode,Id?: string})
  {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true)
    const handleCartIconClick = () => {
      setIsDrawerOpen(!isDrawerOpen)
      
    }
    
  return ( 
  <div className=" bg-gray-100 flex flex-row items-start  w-full h-screen  cursor-default">
      {Id && <AdminNav isOpen={isDrawerOpen} info={Id} onCartIconClick={handleCartIconClick} />}
   
    <div className="container max-h-full p-2 flex flex-col gap-2">
      <div className="flex flex-col p-2 gap-2">
            <h2 className="text-2xl flex gap-3 items-centers text-gray-600 font-semibold py-6">
              Product Management
            </h2>
         <Button className="w-[3rem] mr-6" onPress={handleCartIconClick}>
            Dashboard
        </Button>
      </div>

        {children}

    </div>
   
  </div> );
}