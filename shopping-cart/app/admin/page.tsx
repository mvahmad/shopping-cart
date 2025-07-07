"use client"
import { Button, Card, CardBody } from "@nextui-org/react";
import AdminNav from "./components/adminNav";
import { useState } from "react";
const items = [{name:"فروش روزانه",price:"123"},{name:"سود روزانه",price:"2234"},
  {name:"فروش ماهانه",price:"223"},{name:"تعداد کاربران",price:"300"}]

function AdminDashboard() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true)
    const handleCartIconClick = () => {
  setIsDrawerOpen(!isDrawerOpen)
 }
  return ( 
  <div className=" bg-gray-100 flex flex-row items-start  w-full h-screen  cursor-default">
    <AdminNav isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick} />
    <div className="container p-2 flex flex-col gap-2">
       <h2 className="text-2xl flex flex-col  text-gray-600 font-semibold py-6">
        Admin Dashboard
       <Button className="w-[3rem]" onPress={handleCartIconClick}>Dashboard</Button>
      </h2>
      <div className="flex gap-1  justify-start items-center">
       
        {items.map((item,index)=>{
          return(
            <Card key={index} className="p-3">
              <CardBody className="flex flex-col gap-3">
                <span>{item.name}</span>
                <div className="flex items-center gap-1">
                  <span className="text-green-500">{item.price}</span><span>:تومان</span>
                </div>
                
              </CardBody>
            </Card>
          )
        })}
      </div>

    </div>
   
  </div> );
}
export default AdminDashboard;