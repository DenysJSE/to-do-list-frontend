import React from 'react'
import { useCategory } from '@/hooks/categories/useCategory'
import useUpdateCategory from '@/hooks/categories/useUpdateCategory'
import { useEditableInput } from '@/hooks/useEditableInput'

export default function TasksCategoryTitle({
	mode,
	ref
}: {
	mode: 'Category' | 'User'
	ref: React.RefObject<HTMLDivElement>
}) {
	const { category } =
		mode === 'Category' ? useCategory() : { category: undefined }

	const { title, setTitle, setColor, handleSubmit } = useUpdateCategory()

	const { isEditInput, setIsEditInput } = useEditableInput(ref, handleSubmit)

	return (
		<h1 className='font-bold text-2xl'>
			{mode === 'Category' ? (
				isEditInput ? (
					<div ref={ref}>
						<input
							type='text'
							value={title}
							autoFocus={true}
							className='category-title'
							onChange={e => setTitle(e.target.value)}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									handleSubmit()
									setIsEditInput(false)
								}
							}}
						/>
					</div>
				) : (
					<p
						className='category-title'
						onClick={() => {
							if (category) {
								setTitle(category.title)
								setColor(category.color)
							}
							setIsEditInput(true)
						}}
					>
						{category?.title}
					</p>
				)
			) : (
				'Tasks'
			)}
		</h1>
	)
}
