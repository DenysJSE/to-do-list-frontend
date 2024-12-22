import { IUser } from '@/types/user.types'
import { ICategory } from '@/types/category.types'

export enum EnumTaskPriority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH'
}

interface TaskCategory {
	category: ICategory
}

export interface ITaskResponse {
	id: string
	createdAt?: string
	updatedAt?: string
	title: string
	description: string
	priority?: EnumTaskPriority
	isDone: boolean
	subtasks: ISubtask[]
	categories: TaskCategory[]
	users: IUser[]
}

export interface ISubtask {
	id: string
	createdAt?: string
	updatedAt?: string
	title: string
	isDone: boolean
	taskId: number
}

export interface ITaskFormState {
	title: string
	description: string
	priority: EnumTaskPriority
	categoryId: number
}

export interface ISubtaskFormState {
	title: string
	taskId: number
}
