import Cookies from 'js-cookie'
import { AuthEnum } from '@/constants/constants'

export const getAccessToken = () => {
	const accessToken = Cookies.get(AuthEnum.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(AuthEnum.ACCESS_TOKEN, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	})
}

export const removeFromStorage = () => {
	Cookies.remove(AuthEnum.ACCESS_TOKEN)
}
