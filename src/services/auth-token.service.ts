import Cookies from 'js-cookie'
import { AuthEnum } from '@/constants/constants'
import { IAuthResponse } from '@/types/auth.types'

export const getAccessToken = () => {
	const accessToken = Cookies.get(AuthEnum.ACCESS_TOKEN)
	return accessToken || null
}

export const saveToStorage = (data: IAuthResponse) => {
	Cookies.set(AuthEnum.ACCESS_TOKEN, data.accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	})
	localStorage.setItem('user', JSON.stringify(data.user))
}

export const removeFromStorage = () => {
	Cookies.remove(AuthEnum.ACCESS_TOKEN, {
		domain: 'localhost',
		path: '/'
	})
	Cookies.remove(AuthEnum.REFRESH_TOKEN, {
		domain: 'localhost',
		path: '/'
	})
	localStorage.removeItem('user')
}
