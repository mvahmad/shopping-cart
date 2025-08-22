'use client'

import { useState, useEffect } from "react"
import Header from "./components/ui/header"
import Footer from "./components/ui/footer"
import AboutSection from "./components/about/about"
import CategoryCard from "./components/ui/categoryCard"




export default function Home() {


    return (
        <>
            <Header />
            <main className='[Elite-Sport-Home] w-full bg-white'>
                <CategoryCard />
                <AboutSection />
            </main>
            <Footer />

        </>)

}
