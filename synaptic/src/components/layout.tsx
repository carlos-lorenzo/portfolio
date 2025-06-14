import { ReactNode } from "react";
import { Geist } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import Head from "next/head";
type Props = {
  children: ReactNode;
}

const geist = Geist({
  subsets: ['latin'],
})
 
export default function RootLayout({ children }: Props) {

	

	return (
		<html lang="en" className={geist.className}>
			<Head>
				<title>Carlos Lorenzo&apos;s Portfolio</title>
			</Head>
			<GoogleAnalytics gaId="G-X699SVFWJZ" />
			<body>{children}</body>
		</html>
	)
}