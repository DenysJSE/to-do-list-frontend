'use client'

import { useTask } from '@/hooks/tasks/useTask'
import { useSubtasks } from '@/hooks/tasks/useSubtasks'
import React, { useState } from 'react'
import { useDeleteSubtask } from '@/hooks/tasks/useDeleteSubtask'
import { Flag, Hash, Plus, Trash } from 'lucide-react'
import AddSubtask from '@/components/forms/AddSubtask'
import { EnumTaskPriority } from '@/types/task.types'
import reformatPriority from '@/utils/reformat-priority'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { toast } from 'sonner'

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
	const { task, id } = useTask()
	const { subtasks } = useSubtasks()

	const { deleteSubtask } = useDeleteSubtask()

	const queryClient = useQueryClient()

	const { mutate: mutateDone } = useMutation({
		mutationKey: ['mark task as done'],
		mutationFn: (taskId: number) => taskService.markSubtaskAsDone(taskId),
		onSuccess() {
			toast.success('Subtask is completed!')

			queryClient.invalidateQueries({ queryKey: ['subtasks', id] })
		}
	})

	const { mutate: mutateUndone } = useMutation({
		mutationKey: ['mark task as undone'],
		mutationFn: (taskId: number) => taskService.markSubtaskAsUndone(taskId),
		onSuccess() {
			toast.success('Subtask is uncompleted!')

			queryClient.invalidateQueries({ queryKey: ['subtasks', id] })
		}
	})

	const handleDoneSubmit = (id: number) => {
		mutateDone(id)
	}

	const handleUndoneSubmit = (id: number) => {
		mutateUndone(id)
	}

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
							subtasks.map(subtask =>
								!subtask.isDone ? (
									<div key={subtask.id}>
										<div className='flex items-center gap-4 mt-2 px-6'>
											<div
												className='w-5 h-5 bg-transparent rounded-full border border-button-background flex items-center justify-center cursor-pointer'
												onClick={e => {
													e.preventDefault()
													e.stopPropagation()
													handleDoneSubmit(+subtask.id)
												}}
											/>
											<h2>{subtask.title}</h2>
											<button
												onClick={() => deleteSubtask(subtask.id)}
												className='ml-auto'
											>
												<Trash
													width={20}
													height={20}
													color='var(--button-background)'
												/>
											</button>
										</div>
										<hr className='mt-4 border border-border ml-5' />
									</div>
								) : (
									<div key={subtask.id}>
										<div className='flex items-center gap-4 mt-2 px-6 opacity-50'>
											<div
												className='w-5 h-5 bg-transparent rounded-full border border-button-background flex items-center justify-center cursor-pointer'
												onClick={e => {
													e.preventDefault()
													e.stopPropagation()
													handleUndoneSubmit(+subtask.id)
												}}
											>
												<div className='w-3 h-3 bg-button-background rounded-full' />
											</div>
											<h2 className='line-through'>{subtask.title}</h2>
											<button
												onClick={() => deleteSubtask(subtask.id)}
												className='ml-auto'
											>
												<Trash
													width={20}
													height={20}
													color='var(--button-background)'
												/>
											</button>
										</div>
										<hr className='mt-4 border border-border ml-5' />
									</div>
								)
							)
						) : (
							<h1>There are no subtask!</h1>
						)}
					</div>
				) : (
					<p>Task not found</p>
				)}

				{!task?.isDone && (
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
				)}
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
