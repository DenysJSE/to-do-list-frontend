'use client'

import { useTask } from '@/hooks/tasks/useTask'
import { useSubtasks } from '@/hooks/tasks/useSubtasks'
import React, { useState } from 'react'
import { useDeleteSubtask } from '@/hooks/tasks/useDeleteSubtask'
import { Plus } from 'lucide-react'
import AddSubtask from '@/components/forms/AddSubtask'
import Subtask from '@/app/tasks/[id]/Subtask'
import useMarkAsDoneSubtask from '@/hooks/tasks/useMarkAsDoneSubtask'
import useMarkAsUndoneSubtask from '@/hooks/tasks/useMarkAsUndoneSubtask'
import TaskSidebar from '@/app/tasks/[id]/TaskSidebar'
import TaskTitle from '@/app/tasks/[id]/TaskTitle'
import TaskDescription from '@/app/tasks/[id]/TaskDescription'

export default function Task() {
	const { task } = useTask()
	const { subtasks } = useSubtasks()

	const { deleteSubtask } = useDeleteSubtask()

	const { handleDoneSubmit } = useMarkAsDoneSubtask()
	const { handleUndoneSubmit } = useMarkAsUndoneSubtask()

	const [isSubtaskForm, setIsSubtaskForm] = useState(false)

	return (
		<div className='flex m-auto py-14 w-[1200px] gap-4'>
			<div className='w-[800px]'>
				{task ? (
					<div className='flex flex-col gap-2'>
						<TaskTitle task={task} />
						<TaskDescription task={task} />
						<h1 className='mt-4 font-medium'>Sub-tasks</h1>
						{subtasks.map(subtask => (
							<Subtask
								key={subtask.id}
								subtask={subtask}
								handleDoneSubmit={handleDoneSubmit}
								handleUndoneSubmit={handleUndoneSubmit}
								deleteSubtask={deleteSubtask}
							/>
						))}
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

			<TaskSidebar task={task} />
		</div>
	)
}
