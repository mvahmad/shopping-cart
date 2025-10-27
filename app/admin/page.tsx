'use client'
import AdminHomePage from "./products/page";
import { Suspense } from "react";
function AdminHome() {
     return (
    <Suspense fallback={<div>Loading...</div>}>
        <AdminHomePage />
    </Suspense>)

}
export default AdminHome ;