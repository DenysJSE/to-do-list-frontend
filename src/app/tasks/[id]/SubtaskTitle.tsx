import { useOutside } from '@/hooks/useOutside'
import { useEditableInput } from '@/hooks/useEditableInput'
import React from 'react'
import useUpdateSubtask from '@/hooks/tasks/useUpdateSubtask'
import { ISubtask } from '@/types/task.types'

export default function SubtaskTitle({ subtask }: { subtask: ISubtask }) {
	const { title, setTitle, setSubtaskId, handleSubmit } = useUpdateSubtask()

	const { ref } = useOutside(false)

	const { isEditInput, setIsEditInput } = useEditableInput(ref, handleSubmit)

	return (
		<h2 className={subtask.isDone ? 'line-through' : ''}>
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
						if (subtask) {
							setTitle(subtask.title)
							setSubtaskId(+subtask.id)
						}
						setIsEditInput(true)
					}}
				>
					{subtask.title}
				</p>
			)}
		</h2>
	)
}
