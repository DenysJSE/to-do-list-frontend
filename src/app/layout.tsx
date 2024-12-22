import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import React from 'react'
import Provider from '@/app/provider'
import { Toaster } from 'sonner'
import { SITE_NAME } from '@/constants/seo.constants'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700']
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Modern ToDo List with huge functionality'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={roboto.className}>
			<body>
				<Provider>
					<main>{children}</main>
					<Toaster
						richColors
						theme='light'
						position='bottom-right'
						duration={3000}
					/>
				</Provider>
			</body>
		</html>
	)
}
