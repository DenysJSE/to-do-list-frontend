import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import React, { Suspense } from 'react'
import Provider from '@/app/provider'
import { Toaster } from 'sonner'
import { SITE_NAME } from '@/constants/seo.constants'
import Sidebar from '@/components/layouts/Sidebar'

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
			<body className='relative'>
				<Suspense fallback={<h1>Loading...</h1>}>
					<Provider>
						<Sidebar />
						<main className='pl-[300px]'>{children}</main>
						<Toaster
							richColors
							theme='light'
							position='bottom-right'
							duration={3000}
						/>
					</Provider>
				</Suspense>
			</body>
		</html>
	)
}
