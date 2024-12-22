import { axiosWithAuth } from '@/api/interceptors'
import { IUserResponse, TUserForm } from '@/types/user.types'

const BASE_URL = '/user/profile'

export const userService = {
	async getProfile() {
		const response = await axiosWithAuth.get<IUserResponse>(BASE_URL)
		return response.data
	},

	async update(data: TUserForm) {
		const response = await axiosWithAuth.put(BASE_URL, data)
		return response.data
	}
}
