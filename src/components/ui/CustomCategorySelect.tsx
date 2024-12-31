'use client'

import React, { useEffect, useState } from 'react'
import { TCategoryResponse } from '@/types/category.types'
import { useOutside } from '@/hooks/useOutside'
import { Hash } from 'lucide-react'
import { useParams } from 'next/navigation'

interface ICustomCategorySelect {
	setCategoryIdAction: (categoryId: number) => void
	categories: TCategoryResponse[]
}

export default function CustomCategorySelect({
	setCategoryIdAction,
	categories
}: ICustomCategorySelect) {
	const { id: categoryId } = useParams()

	const found = categories.find(({ id }) => +id === Number(categoryId))

	const { isShow, setIsShow, ref } = useOutside(false)

	const [category, setCategory] = useState(
		found ? found.title : categories[0]?.title
	)

	useEffect(() => {
		if (found) {
			setCategory(found.title)
			setCategoryIdAction(+found.id)
		} else if (categories.length > 0) {
			setCategory(categories[0].title)
			setCategoryIdAction(+categories[0].id)
		}
	}, [found, categories, setCategoryIdAction])

	return (
		<div ref={ref} className='z-10 w-fit'>
			<div
				className='border border-placeholder rounded-md p-1 px-3 w-fit text-center appearance-none mt-2 text-sm flex items-center gap-1 cursor-pointer'
				onClick={() => setIsShow(!isShow)}
			>
				<Hash width={16} height={16} color='gray' />
				<h1 className='font-medium opacity-70'>{category}</h1>
			</div>

			{isShow && (
				<div className='absolute bg-background border border-placeholder rounded-md w-fit appearance-none mt-1 text-sm flex flex-col'>
					{categories.map(c => (
						<p
							key={c.id}
							className={`option ${c.title === category ? 'active' : ''}`}
							onClick={() => {
								setCategory(c.title)
								setCategoryIdAction(+c.id)
								setIsShow(false)
							}}
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
