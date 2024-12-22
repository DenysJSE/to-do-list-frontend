'use client'

import { useTask } from '@/hooks/tasks/useTask'
import { useSubtasks } from '@/hooks/tasks/useSubtasks'
import { EnumTaskPriority } from '@/types/task.types'
import React from 'react'
import { useCreateSubtask } from '@/hooks/tasks/useCreateSubtask'
import { useDeleteSubtask } from '@/hooks/tasks/useDeleteSubtask'

const priorityClasses: Record<EnumTaskPriority, string> = {
	[EnumTaskPriority.LOW]: 'bg-low',
	[EnumTaskPriority.MEDIUM]: 'bg-medium',
	[EnumTaskPriority.HIGH]: 'bg-high'
}

export default function Task() {
	const { task } = useTask()
	const { subtasks } = useSubtasks()

	const { deleteSubtask } = useDeleteSubtask()

	const { title, setTitle, handleSubmit } = useCreateSubtask()

	return (
		<div className='p-10'>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type='text'
						placeholder='Title'
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
					/>
					<button type='submit'>Crate subtask</button>
				</div>
			</form>
			{task ? (
				<div className='flex flex-col gap-3'>
					<h1 className='font-bold text-3xl'>{task.title}</h1>
					<p className='text-xl'>{task.description}</p>
					<p>{task.categories[0].category.title}</p>
					<p
						className={`${priorityClasses[task.priority as EnumTaskPriority]} w-fit p-2 px-8 rounded-2xl`}
					>
						{task.priority}
					</p>
					<hr className='border-border' />
					<h1 className='font-bold text-xl'>Subtasks</h1>
					{subtasks.length ? (
						subtasks.map(subtask => (
							<div
								key={subtask.id}
								className='flex items-center justify-between border-2 border-border rounded-xl p-4 px-6'
							>
								<h2>{subtask.title}</h2>
								<button onClick={() => deleteSubtask(subtask.id)}>
									Delete
								</button>
							</div>
						))
					) : (
						<h1>There are no subtask!</h1>
					)}
				</div>
			) : (
				<p>Task not found</p>
			)}
		</div>
	)
}
