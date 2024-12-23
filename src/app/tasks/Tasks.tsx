'use client'

import React from 'react'
import { useTasks } from '@/hooks/tasks/useTasks'
import { EnumTaskPriority } from '@/types/task.types'
import { useCreateTask } from '@/hooks/tasks/useCreateTask'
import { useDeleteTask } from '@/hooks/tasks/useDeleteTask'
import Link from 'next/link'
import { useCategoryTasks } from '@/hooks/tasks/useCategoryTasks'
import { useCategory } from '@/hooks/categories/useCategory'
import Loader from '@/components/ui/Loader'

interface ITasks {
	mode: 'User' | 'Category'
}

export default function Tasks({ mode }: ITasks) {
	const {
		title,
		setTitle,
		description,
		setDescription,
		categoryId,
		setCategoryId,
		priority,
		setPriority,
		priorityValues,
		handleSubmit
	} = useCreateTask()

	const { deleteTask } = useDeleteTask()

	const { category } =
		mode === 'Category' ? useCategory() : { category: undefined }

	const { tasks, isLoading } = useDynamicTasks(mode)

	if (isLoading) return <Loader />

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
					<input
						type='text'
						placeholder='Description'
						value={description}
						onChange={e => setDescription(e.target.value)}
						required
					/>
					<input
						type='number'
						placeholder='Category ID'
						value={categoryId}
						onChange={e => setCategoryId(Number(e.target.value))}
						required
					/>
					<select
						name='color'
						value={priority}
						onChange={e => setPriority(e.target.value as EnumTaskPriority)}
					>
						{priorityValues.map(priority => (
							<option value={priority} key={priority}>
								{priority}
							</option>
						))}
					</select>
					<button type='submit'>Crate task</button>
				</div>
			</form>

			<div className='flex flex-col gap-3'>
				<h1 className='font-bold text-2xl'>
					{mode === 'Category' && category?.title} Tasks
				</h1>
				{tasks.map(task => (
					<div
						key={task.id}
						className='border-2 border-border rounded-2xl p-4 px-8'
					>
						<Link href={`/tasks/${task.id}`}>
							<h1>{task.title}</h1>
						</Link>
						<p>{task.description}</p>
						<p>{task.priority}</p>
						<p>{task.categories[0].category.title}</p>
						<button onClick={() => deleteTask(task.id)}>Delete task</button>
					</div>
				))}
			</div>
		</div>
	)
}

function useDynamicTasks(mode: 'User' | 'Category') {
	return mode === 'User' ? useTasks() : useCategoryTasks()
}
