import useUpdateTask from '@/hooks/tasks/useUpdateTask'
import { useOutside } from '@/hooks/useOutside'
import { useEditableInput } from '@/hooks/useEditableInput'
import React from 'react'
import { ITaskResponse } from '@/types/task.types'

export default function TaskDescription({ task }: { task: ITaskResponse }) {
	const {
		description,
		setTitle,
		setDescription,
		setCategoryId,
		setPriority,
		handleSubmit
	} = useUpdateTask()

	const { ref } = useOutside(false)

	const { isEditInput, setIsEditInput } = useEditableInput(ref, handleSubmit)

	return (
		<div>
			{isEditInput ? (
				<div ref={ref}>
					<input
						type='text'
						value={description}
						autoFocus={true}
						className='category-title'
						onChange={e => setDescription(e.target.value)}
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
					{task.description}
				</p>
			)}
		</div>
	)
}
