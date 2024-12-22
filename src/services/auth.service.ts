import { IAuthResponse, IAuth } from '@/types/auth.types'
import { axiosClassic } from '@/api/interceptors'
import {
	removeFromStorage,
	saveTokenStorage
} from '@/services/auth-token.service'

export const authService = {
	async auth(type: 'login' | 'register', data: IAuth) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data) saveTokenStorage(response.data.accessToken)

		return response
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	}
}
