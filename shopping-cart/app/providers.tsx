'use client'
import {NextUIProvider} from '@nextui-org/react'
import { QueryClientProvider } from '@tanstack/react-query'
import client from './lib/react-query'
export function Providers({children}: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </QueryClientProvider>
  )
}