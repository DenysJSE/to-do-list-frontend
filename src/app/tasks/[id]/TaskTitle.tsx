import React from 'react'
import useUpdateTask from '@/hooks/tasks/useUpdateTask'
import { useOutside } from '@/hooks/useOutside'
import { ITaskResponse } from '@/types/task.types'
import { useEditableInput } from '@/hooks/useEditableInput'

export default function TaskTitle({ task }: { task: ITaskResponse }) {
	const {
		title,
		setTitle,
		setDescription,
		setCategoryId,
		setPriority,
		handleSubmit
	} = useUpdateTask()

	const { ref } = useOutside(false)

	const { isEditInput, setIsEditInput } = useEditableInput(ref, handleSubmit)

	return (
		<h1 className='font-bold text-2xl'>
			{isEditInput ? (
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
						if (task) {
							setTitle(task.title)
							setDescription(task.description)
							setPriority(task.priority)
							setCategoryId(+task.categories[0].category.id)
						}
						setIsEditInput(true)
					}}
				>
					{task.title}
				</p>
			)}
		</h1>
	)
}
