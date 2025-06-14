import { ReactNode } from "react";
import { Geist } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'

type Props = {
  children: ReactNode;
}

const geist = Geist({
  subsets: ['latin'],
})
 
export default function RootLayout({ children }: Props) {

	

	return (
		<html lang="en" className={geist.className}>
			<head>
				<title>Carlos Lorenzo&apos;s Portfolio</title>
			</head>
			<GoogleAnalytics gaId="G-X699SVFWJZ" />
			<body>{children}</body>
		</html>
	)
}