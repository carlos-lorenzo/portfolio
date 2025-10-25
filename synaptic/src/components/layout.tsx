import { ReactNode } from "react";
import { Geist } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import SEO from "./SEO";

type Props = {
  children: ReactNode;
}

const geist = Geist({
  subsets: ['latin'],
})
 
export default function RootLayout({ children }: Props) {

	

	return (
		<html lang="en" className={geist.className}>
			<SEO />
			<GoogleAnalytics gaId="G-X699SVFWJZ" />
			<body>{children}</body>
		</html>
	)
}