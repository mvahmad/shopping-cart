'use client'
import {NextUIProvider} from '@nextui-org/react'
import { QueryClientProvider } from '@tanstack/react-query'
import client from './lib/react-query'
import { Flip, ToastContainer } from "react-toastify";
export function Providers({children}: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={client}>
       <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          transition={Flip}
        />
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </QueryClientProvider>
  )
}