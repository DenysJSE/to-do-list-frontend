'use client'

import React, { useEffect, useState } from 'react'
import { TCategoryResponse } from '@/types/category.types'
import { useOutside } from '@/hooks/useOutside'
import { useCategory } from '@/hooks/categories/useCategory'
import { Hash } from 'lucide-react'

interface ICustomCategorySelect {
	categoryId: number
	setCategoryIdAction: (categoryId: number) => void
	categories: TCategoryResponse[]
}

export default function CustomCategorySelect({
	categoryId,
	setCategoryIdAction,
	categories
}: ICustomCategorySelect) {
	const { isShow, setIsShow, ref } = useOutside(false)

	const { category } = useCategory()
	if (!category) return <h1>Category not found</h1>

	const [selectedTitle, setSelectedTitle] = useState<string>(category.title)

	const handleSelectCategory = (
		selectedCategoryId: number,
		selectedTitle: string
	) => {
		setCategoryIdAction(selectedCategoryId)
		setSelectedTitle(selectedTitle)
		setIsShow(false)
	}

	useEffect(() => {
		setSelectedTitle(category.title)
	}, [category.title])

	return (
		<div ref={ref} className='z-10 w-fit'>
			<div
				className='border border-placeholder rounded-md p-1 px-3 w-fit text-center appearance-none mt-2 text-sm flex items-center gap-1 cursor-pointer'
				onClick={() => setIsShow(!isShow)}
			>
				<Hash width={16} height={16} color='gray' />
				<h1 className='font-medium opacity-70'>{selectedTitle}</h1>
			</div>

			{isShow && (
				<div className='absolute bg-background border border-placeholder rounded-md w-fit appearance-none mt-1 text-sm flex flex-col'>
					{categories.map(c => (
						<p
							key={c.id}
							className={`option ${Number(c.id) === categoryId ? 'active' : ''}`}
							onClick={() => handleSelectCategory(Number(c.id), c.title)}
						>
							<Hash width={16} height={16} color='gray' />
							{c.title}
						</p>
					))}
				</div>
			)}
		</div>
	)
}
