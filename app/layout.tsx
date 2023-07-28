import "./globals.css"
import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"
import { NextAuthProvider } from "./provider"
import { Analytics } from "@vercel/analytics/react"

const poppins = Nunito_Sans({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Linkzyp",
  description: "Create your portfolio and share it with others",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} text-neutral-dark`}>
        <NextAuthProvider>
          {children}
          <Analytics />
        </NextAuthProvider>
      </body>
    </html>
  )
}
