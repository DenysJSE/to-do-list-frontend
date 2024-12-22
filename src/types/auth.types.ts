import { IUser } from '@/types/user.types'

export interface IAuth {
	email: string
	password: string
	name?: string
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
