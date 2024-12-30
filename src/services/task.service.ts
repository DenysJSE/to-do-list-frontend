import { axiosWithAuth } from '@/api/interceptors'
import {
	ISubtask,
	ISubtaskFormState,
	ITaskFormState,
	ITaskResponse
} from '@/types/task.types'

export const taskService = {
	async createTask(data: ITaskFormState) {
		const response = await axiosWithAuth.post<ITaskResponse>('/tasks', data)
		return response.data
	},

	async getById(taskId: number | string) {
		const response = await axiosWithAuth.get<ITaskResponse>(
			`/tasks/by-id/${taskId}`
		)
		return response.data
	},

	async getAllByUser() {
		const response = await axiosWithAuth.get<ITaskResponse[]>(`/tasks/by-user`)
		return response.data
	},

	async getAllByCategory(categoryId: number | string) {
		const response = await axiosWithAuth.get<ITaskResponse[]>(
			`/tasks/by-category/${categoryId}`
		)
		return response.data
	},

	async markTaskAsDone(taskId: number | string) {
		const response = await axiosWithAuth.patch(`/tasks/complete-task/${taskId}`)
		return response.data
	},

	async markTaskAsUndone(taskId: number | string) {
		const response = await axiosWithAuth.patch(
			`/tasks/incomplete-task/${taskId}`
		)
		return response.data
	},

	async updateTask(taskId: number | string, data: ITaskFormState) {
		const response = await axiosWithAuth.put<ITaskResponse>(
			`/tasks/${taskId}`,
			data
		)
		return response.data
	},

	async deleteTask(taskId: number | string) {
		const response = await axiosWithAuth.delete(`/tasks/${taskId}`)
		return response.data
	},

	async createSubtask(data: ISubtaskFormState) {
		const response = await axiosWithAuth.post<ISubtask>(
			'/tasks/create-subtask',
			data
		)
		return response.data
	},

	async getSubtaskByTask(taskId: number | string) {
		const response = await axiosWithAuth.get<ISubtask[]>(
			`/tasks/subtask-by-task/${taskId}`
		)
		return response.data
	},

	async updateSubtask(subtaskId: number | string, data: ISubtaskFormState) {
		const response = await axiosWithAuth.put<ISubtask>(
			`/tasks/subtask/${subtaskId}`,
			data
		)
		return response.data
	},

	async deleteSubtask(subtaskId: number | string) {
		const response = await axiosWithAuth.delete(`/tasks/subtask/${subtaskId}`)
		return response.data
	},

	async markSubtaskAsDone(subtaskId: number | string) {
		const response = await axiosWithAuth.patch(
			`/tasks/complete-subtask/${subtaskId}`
		)
		return response.data
	}
}
