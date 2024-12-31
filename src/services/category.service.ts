import { ICategoryFormState, TCategoryResponse } from '@/types/category.types'
import { axiosWithAuth } from '@/api/interceptors'

export const categoryService = {
	async createCategory(data: ICategoryFormState) {
		const response = await axiosWithAuth.post<ICategoryFormState>(
			'/categories',
			data
		)
		return response.data
	},

	async getById(categoryId: number | string) {
		const response = await axiosWithAuth.get<TCategoryResponse>(
			`/categories/by-id/${categoryId}`
		)
		return response.data
	},

	async getAllByUser() {
		const response =
			await axiosWithAuth.get<TCategoryResponse[]>(`/categories/by-user`)
		return response.data
	},

	async getFavorites() {
		const response =
			await axiosWithAuth.get<TCategoryResponse[]>(`/categories/favorite`)
		return response.data
	},

	async update(categoryId: number | string, data: ICategoryFormState) {
		const response = await axiosWithAuth.put<TCategoryResponse>(
			`/categories/${categoryId}`,
			data
		)
		return response.data
	},

	async delete(categoryId: number | string) {
		const response = await axiosWithAuth.delete(`/categories/${categoryId}`)
		return response.data
	},

	async addToFavorite(categoryId: number | string) {
		const response = await axiosWithAuth.patch(`/categories/${categoryId}`)
		return response.data
	},

	async removeFromFavorite(categoryId: number | string) {
		const response = await axiosWithAuth.patch(
			`/categories/remove/${categoryId}`
		)
		return response.data
	}
}
