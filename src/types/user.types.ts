import { ITaskResponse } from '@/types/task.types'
import { ICategory } from '@/types/category.types'

export interface IUser {
	id: string
	email: string
	name?: string

	tasks: ITaskResponse[]
	categories: ICategory[]
}

export interface IUserResponse extends IUser {}

export type TUserForm = Omit<IUser, 'id'> & { password?: string }
