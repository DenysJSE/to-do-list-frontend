import { NextRequest, NextResponse } from 'next/server'
import { AuthEnum } from '@/constants/constants'
import { APP_PAGES } from '@/config/pages-url.config'

export async function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get(AuthEnum.REFRESH_TOKEN)?.value
	const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

	if (!refreshToken && !isAuthPage) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(APP_PAGES.HOME, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth/:path*', '/((?!_next|favicon.ico).*)']
}
