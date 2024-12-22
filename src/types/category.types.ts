import { IUser } from '@/types/user.types'
import { ITaskResponse } from '@/types/task.types'

export enum EnumCategoryColor {
	BlushPink = 'BlushPink',
	CoralRed = 'CoralRed',
	AmberGold = 'AmberGold',
	OceanBlue = 'OceanBlue',
	EmeraldGreen = 'EmeraldGreen',
	SapphireBlue = 'SapphireBlue',
	LavenderPurple = 'LavenderPurple',
	SunsetOrange = 'SunsetOrange',
	MintGreen = 'MintGreen',
	CrimsonRed = 'CrimsonRed',
	SteelGray = 'SteelGray',
	SlateBlue = 'SlateBlue',
	Rosewood = 'Rosewood',
	IvoryWhite = 'IvoryWhite',
	ChocolateBrown = 'ChocolateBrown',
	ForestGreen = 'ForestGreen',
	SkyBlue = 'SkyBlue',
	GoldenYellow = 'GoldenYellow',
	MidnightBlack = 'MidnightBlack',
	PeachPink = 'PeachPink'
}

export interface ICategory {
	id: string
	createdAt?: string
	updatedAt?: string
	title: string
	isFavorite?: boolean
	color: EnumCategoryColor

	users: IUser[]
	tasks: ITaskResponse[]
}

export type TCategoryResponse = Omit<ICategory, 'users' | 'tasks'>

export interface ICategoryFormState {
	title: string
	color: EnumCategoryColor
}
