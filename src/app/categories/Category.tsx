'use client'

import { EnumCategoryColor } from '@/types/category.types'
import React from 'react'
import { useCategories } from '@/hooks/categories/useCategories'
import {
	categoryColorClasses,
	useCreateCategory
} from '@/hooks/categories/useCreateCategory'
import { useDeleteCategory } from '@/hooks/categories/useDeleteCategory'
import Link from 'next/link'

enum EnumCategoryColors {
	BlushPink = '#FFDDE1',
	CoralRed = '#FFC8C1',
	AmberGold = '#FFE8A5',
	OceanBlue = '#CDEAFD',
	EmeraldGreen = '#DFF7D8',
	SapphireBlue = '#D6E4F9',
	LavenderPurple = '#EBDFF9',
	SunsetOrange = '#FFE3CF',
	MintGreen = '#DFF7E6',
	CrimsonRed = '#FBCBCB',
	SteelGray = '#E2E5E9',
	SlateBlue = '#E0E8F9',
	Rosewood = '#F7DADA',
	IvoryWhite = '#FFF8E7',
	ChocolateBrown = '#EBD5C7',
	ForestGreen = '#DDF7D4',
	SkyBlue = '#DFF3FE',
	GoldenYellow = '#FFF3C4',
	MidnightBlack = '#F4F4F4',
	PeachPink = '#FFE7DE'
}

export default function Category() {
	const { handleSubmit, title, setTitle, color, setColor, colorValues } =
		useCreateCategory()

	const { deleteCategory, isDeletePending } = useDeleteCategory()

	const { categories } = useCategories()

	return (
		<div className='flex flex-col gap-4 p-10'>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type='text'
						placeholder='Title'
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
					/>
					<select
						name='color'
						value={color}
						onChange={e => setColor(e.target.value as EnumCategoryColor)}
					>
						{colorValues.map(color => (
							<option value={color} key={color}>
								{color}
							</option>
						))}
					</select>
					<button type='submit'>Crate task</button>
				</div>
			</form>
			<div className='flex flex-col gap-3'>
				<h1 className='font-bold text-2xl'>Categories</h1>
				{categories.map(category => (
					<Link key={category.id} href={`/categories/tasks/${category.id}`}>
						<div
							className='flex items-center justify-between py-3 px-6'
							style={{ backgroundColor: EnumCategoryColors[category.color] }}
						>
							<h1>{category.title}</h1>
							<button onClick={() => deleteCategory(category.id)}>
								Delete
							</button>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
