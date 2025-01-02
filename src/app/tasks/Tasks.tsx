'use client'

import React, { useEffect, useState } from 'react'
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
import { useOutside } from '@/hooks/useOutside'
import DeleteTaskModal from '@/components/ui/DeleteTaskModal'
import useMarkAsDone from '@/hooks/tasks/useMarkAdDone'
import useMarkAsUndone from '@/hooks/tasks/useMarkAdUndone'
import useUpdateCategory from '@/hooks/categories/useUpdateCategory'

interface ITasks {
	mode: 'User' | 'Category'
}

export default function Tasks({ mode }: ITasks) {
	const { deleteTask } = useDeleteTask()

	const { category } =
		mode === 'Category' ? useCategory() : { category: undefined }

	const { tasks, isLoading } = useDynamicTasks(mode)

	const { handleDoneSubmit } = useMarkAsDone()
	const { handleUndoneSubmit } = useMarkAsUndone()

	const { title, setTitle, setColor, handleSubmit } = useUpdateCategory()

	const [isTaskForm, setIsTaskForm] = useState(false)
	const { isShow, setIsShow, ref } = useOutside(false)
	const [modalTaskId, setModalTaskId] = useState<string | null>(null)

	const [isEditInput, setIsEditInput] = useState(false)

	useEffect(() => {
		if (isEditInput) {
			const handleClickOutside = (e: MouseEvent) => {
				if (ref.current && !ref.current.contains(e.target as Node)) {
					handleSubmit()
					setIsEditInput(false)
				}
			}

			document.addEventListener('mousedown', handleClickOutside)

			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}
	}, [isEditInput, handleSubmit, ref])

	const openDeleteModal = (taskId: string) => {
		setModalTaskId(taskId)
		setIsShow(true)
	}

	const closeDeleteModal = () => {
		setModalTaskId(null)
		setIsShow(false)
	}

	if (isLoading) return <Loader />

	return (
		<div className='flex flex-col m-auto gap-4 py-14 max-w-[800px]'>
			<div className='flex flex-col gap-4'>
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
				{tasks.map(task => (
					<div key={task.id}>
						<Link href={`/tasks/${task.id}`}>
							<div className='flex items-center gap-4'>
								<div
									className={`w-5 h-5 bg-transparent rounded-full border border-button-background flex items-center justify-center z-10 ${
										task.isDone ? 'opacity-50' : ''
									}`}
									onClick={e => {
										e.preventDefault()
										e.stopPropagation()
										task.isDone
											? handleUndoneSubmit(+task.id)
											: handleDoneSubmit(+task.id)
									}}
								>
									{task.isDone && (
										<div className='w-3 h-3 bg-button-background rounded-full' />
									)}
								</div>
								<h1
									className={task.isDone ? 'line-through opacity-50 z-10' : ''}
								>
									{task.title}
								</h1>
								<p
									className={`ml-auto mr-5 ${priorityClasses[task.priority as EnumTaskPriority]} text-sm font-medium w-fit p-1 px-8 rounded-xl min-w-32 text-center z-10 ${task.isDone ? 'opacity-50' : ''}`}
								>
									{task.priority}
								</p>
								<button
									onClick={e => {
										e.preventDefault()
										e.stopPropagation()
										openDeleteModal(task.id)
									}}
								>
									<Trash width={20} height={20} />
								</button>
							</div>
						</Link>
					</div>
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

				{isShow && modalTaskId && (
					<DeleteTaskModal
						ref={ref}
						setIsShow={closeDeleteModal}
						deleteTask={deleteTask}
						id={modalTaskId}
					/>
				)}
			</div>
		</div>
	)
}

function useDynamicTasks(mode: 'User' | 'Category') {
	return mode === 'User' ? useTasks() : useCategoryTasks()
}
