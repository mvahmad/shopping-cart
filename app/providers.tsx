'use client'
import {NextUIProvider} from '@nextui-org/react'
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import client from './lib/react-query'
import { Flip, ToastContainer } from "react-toastify";
import { ReactNode, useState } from 'react';


export function Providers({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState?: unknown;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
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
      </HydrationBoundary>
      
    </QueryClientProvider>
  )
}