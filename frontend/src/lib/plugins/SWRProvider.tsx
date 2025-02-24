'use client'
import { ReactNode } from "react"
import { SWRConfig } from "swr"

import api from "@/services/api"

const fetcher = (url: string) => api
.get(url)
.then(res => res.data)

export default function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{ fetcher }}
    >
      {children}
    </SWRConfig>
  )
}
