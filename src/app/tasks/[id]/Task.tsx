'use client'

import { useTask } from '@/hooks/tasks/useTask'
import { useSubtasks } from '@/hooks/tasks/useSubtasks'
import React, { useState } from 'react'
import { useDeleteSubtask } from '@/hooks/tasks/useDeleteSubtask'
import { Flag, Hash, Plus, Trash } from 'lucide-react'
import AddSubtask from '@/components/forms/AddSubtask'
import { EnumTaskPriority } from '@/types/task.types'
import reformatPriority from '@/utils/reformat-priority'

export const priorityClasses: Record<EnumTaskPriority, string> = {
	[EnumTaskPriority.LOW]: 'bg-low',
	[EnumTaskPriority.MEDIUM]: 'bg-medium',
	[EnumTaskPriority.HIGH]: 'bg-high'
}

export const priorityClassesFlag: Record<EnumTaskPriority, string> = {
	[EnumTaskPriority.LOW]: '#A3C9E2',
	[EnumTaskPriority.MEDIUM]: '#A9D8B7',
	[EnumTaskPriority.HIGH]: '#D1A6F2'
}

export default function Task() {
	const { task } = useTask()
	const { subtasks } = useSubtasks()

	const { deleteSubtask } = useDeleteSubtask()

	const [isSubtaskForm, setIsSubtaskForm] = useState(false)

	return (
		<div className='flex m-auto py-14 w-[1200px] gap-4'>
			<div className='w-[800px]'>
				{task ? (
					<div className='flex flex-col gap-2'>
						<h1 className='font-bold text-2xl'>{task.title}</h1>
						<p>{task.description}</p>

						<h1 className='mt-4 font-medium'>Sub-tasks</h1>
						{subtasks.length ? (
							subtasks.map(subtask => (
								<div key={subtask.id}>
									<div className='flex items-center justify-between mt-2 pl-6'>
										<h2>{subtask.title}</h2>
										<button onClick={() => deleteSubtask(subtask.id)}>
											<Trash
												width={20}
												height={20}
												color='var(--button-background)'
											/>
										</button>
									</div>
									<hr className='mt-4 border border-border ml-5' />
								</div>
							))
						) : (
							<h1>There are no subtask!</h1>
						)}
					</div>
				) : (
					<p>Task not found</p>
				)}

				<div className='mt-4 ml-5'>
					{isSubtaskForm ? (
						<AddSubtask setIsTaskForm={setIsSubtaskForm} />
					) : (
						<div
							className='flex items-center gap-3 text-sm text-placeholder cursor-pointer'
							onClick={() => setIsSubtaskForm(true)}
						>
							<Plus width={20} height={20} color={'#DC4C3E'} />
							<h2>Add sub-task</h2>
						</div>
					)}
				</div>
			</div>
			<div className='bg-gray w-80 p-6'>
				<div>
					<span className='text-sm font-bold text-placeholder'>Category</span>
					<div className='flex items-center gap-2 my-2'>
						<Hash width={20} height={20} color='gray' />{' '}
						{task?.categories[0].category.title}
					</div>
				</div>

				<hr className='border border-border' />

				<div className='mt-2'>
					<span className='text-sm font-bold text-placeholder'>Priority</span>
					<div className='flex items-center gap-2 my-2'>
						<Flag
							width={16}
							height={16}
							style={{
								color: task?.priority
									? priorityClassesFlag[task?.priority]
									: '#000'
							}}
						/>
						{task?.priority && reformatPriority(task.priority)}
					</div>
				</div>
			</div>
		</div>
	)
}
