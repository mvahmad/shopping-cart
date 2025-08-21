'use client'

import { useState ,useEffect} from "react"
import Header from "./components/ui/header"
import Footer from "./components/ui/footer"
import AboutSection from "./components/about/about"




export default function Home () {
 

    return (
    <>
    <Header    />
   
        
   <main className='[Elite-Sport-Home] w-full flex flex-col items-center '>
    

    <AboutSection />





  
   
   </main>
   <Footer />

    </>)

}
