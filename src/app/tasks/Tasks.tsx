'use client'

import React, { useState } from 'react'
import { useTasks } from '@/hooks/tasks/useTasks'
import { EnumTaskPriority } from '@/types/task.types'
import { useDeleteTask } from '@/hooks/tasks/useDeleteTask'
import Link from 'next/link'
import { useCategoryTasks } from '@/hooks/tasks/useCategoryTasks'
import { useCategory } from '@/hooks/categories/useCategory'
import Loader from '@/components/ui/Loader'
import { Plus, Trash } from 'lucide-react'
import { priorityClasses } from '@/app/tasks/[id]/Task'
import AddCategoryTask from '@/components/forms/AddCategoryTask'

interface ITasks {
	mode: 'User' | 'Category'
}

export default function Tasks({ mode }: ITasks) {
	const { deleteTask } = useDeleteTask()

	const { category } =
		mode === 'Category' ? useCategory() : { category: undefined }

	const { tasks, isLoading } = useDynamicTasks(mode)

	const [isTaskForm, setIsTaskForm] = useState(false)

	if (isLoading) return <Loader />

	return (
		<div className='flex flex-col m-auto gap-4 py-14 max-w-[800px]'>
			<div className='flex flex-col gap-4'>
				<h1 className='font-bold text-2xl'>
					{mode === 'Category' && category?.title} Tasks
				</h1>
				{tasks.map(task => (
					<Link key={task.id} href={`/tasks/${task.id}`}>
						<div className='flex items-center gap-4'>
							<h1>{task.title}</h1>
							<p
								className={`ml-auto mr-5 ${priorityClasses[task.priority as EnumTaskPriority]} text-sm font-medium w-fit p-1 px-8 rounded-xl min-w-32 text-center`}
							>
								{task.priority}
							</p>
							<button
								onClick={e => {
									e.preventDefault()
									e.stopPropagation()
									deleteTask(task.id)
								}}
							>
								<Trash width={20} height={20} />
							</button>
						</div>
					</Link>
				))}

				{isTaskForm ? (
					<AddCategoryTask setIsTaskForm={setIsTaskForm} />
				) : (
					<div
						className='flex items-center gap-3 text-sm text-placeholder cursor-pointer'
						onClick={() => setIsTaskForm(true)}
					>
						<Plus width={20} height={20} color={'#DC4C3E'} />
						<h2>Add task</h2>
					</div>
				)}
			</div>
		</div>
	)
}

function useDynamicTasks(mode: 'User' | 'Category') {
	return mode === 'User' ? useTasks() : useCategoryTasks()
}
