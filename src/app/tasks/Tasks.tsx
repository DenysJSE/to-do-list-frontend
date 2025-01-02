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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { toast } from 'sonner'
import { useOutside } from '@/hooks/useOutside'
import DeleteTaskModal from '@/components/ui/DeleteTaskModal'

interface ITasks {
	mode: 'User' | 'Category'
}

export default function Tasks({ mode }: ITasks) {
	const { deleteTask } = useDeleteTask()

	const { category } =
		mode === 'Category' ? useCategory() : { category: undefined }

	const { tasks, isLoading } = useDynamicTasks(mode)

	const queryClient = useQueryClient()

	const { mutate: mutateDone } = useMutation({
		mutationKey: ['mark task as done'],
		mutationFn: (id: number) => taskService.markTaskAsDone(id),
		onSuccess() {
			toast.success('Task is completed!')

			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})

			queryClient.invalidateQueries({ queryKey: ['category tasks'] })

			queryClient.invalidateQueries({ queryKey: ['categories'] })

			queryClient.invalidateQueries({ queryKey: ['favorite category'] })
		}
	})

	const { mutate: mutateUndone } = useMutation({
		mutationKey: ['mark task as undone'],
		mutationFn: (id: number) => taskService.markTaskAsUndone(id),
		onSuccess() {
			toast.success('Task is uncompleted!')

			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})

			queryClient.invalidateQueries({ queryKey: ['category tasks'] })

			queryClient.invalidateQueries({ queryKey: ['categories'] })

			queryClient.invalidateQueries({ queryKey: ['favorite category'] })
		}
	})

	const handleDoneSubmit = (id: number) => {
		mutateDone(id)
	}

	const handleUndoneSubmit = (id: number) => {
		mutateUndone(id)
	}

	const [isTaskForm, setIsTaskForm] = useState(false)
	const { isShow, setIsShow, ref } = useOutside(false)
	const [modalTaskId, setModalTaskId] = useState<string | null>(null)

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
					{mode === 'Category' && category?.title} Tasks
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

				{/* Render the modal outside the task loop */}
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
