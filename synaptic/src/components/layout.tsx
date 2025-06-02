import { ReactNode } from "react";
import { Geist } from "next/font/google";

type Props = {
  children: ReactNode;
}

const geist = Geist({
  subsets: ['latin'],
})
 
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={geist.className}>
        <body>{children}</body>
    </html>
  )
}