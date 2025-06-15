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
				<title>Carlos Lorenzo-Zúñiga | Biomedical Engineer & Software Developer</title>
				<meta name="description" content="The portfolio of Carlos Lorenzo, a biomedical engineering student and developer specializing in full-stack applications and machine learning. Explore my work at the intersection of biology and technology." />
				<meta name="author" content="Carlos Lorenzo-Zúñiga Marí"/>
				<meta name="keywords" content="portfolio, Carlos Lorenzo-Zúñiga Marí, biomedical engineer, software developer, machine learning, full-stack development"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			</Head>
			<GoogleAnalytics gaId="G-X699SVFWJZ" />
			<body>{children}</body>
		</html>
	)
}