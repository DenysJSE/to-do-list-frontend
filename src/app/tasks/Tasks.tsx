'use client'

import React, { useState } from 'react'
import { useTasks } from '@/hooks/tasks/useTasks'
import { useDeleteTask } from '@/hooks/tasks/useDeleteTask'
import { useCategoryTasks } from '@/hooks/tasks/useCategoryTasks'
import Loader from '@/components/ui/Loader'
import { Plus } from 'lucide-react'
import AddCategoryTask from '@/components/forms/AddCategoryTask'
import { useOutside } from '@/hooks/useOutside'
import DeleteTaskModal from '@/components/ui/DeleteTaskModal'
import TasksCategoryTitle from '@/app/tasks/TasksCategoryTitle'
import TaskCard from '@/app/tasks/TaskCard'

interface ITasks {
	mode: 'User' | 'Category'
}

export default function Tasks({ mode }: ITasks) {
	const { deleteTask } = useDeleteTask()

	const { tasks, isLoading } = useDynamicTasks(mode)

	const [isTaskForm, setIsTaskForm] = useState(false)
	const { isShow, setIsShow, ref } = useOutside(false)
	const [modalTaskId, setModalTaskId] = useState<string | null>(null)

	const closeDeleteModal = () => {
		setModalTaskId(null)
		setIsShow(false)
	}

	if (isLoading) return <Loader />

	return (
		<div className='flex flex-col m-auto gap-4 py-14 max-w-[800px]'>
			<TasksCategoryTitle mode={mode} ref={ref} />
			<div className='flex flex-col gap-4'>
				{tasks.map(task => (
					<TaskCard
						key={task.id}
						task={task}
						setModalTaskId={setModalTaskId}
						setIsShow={setIsShow}
					/>
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
