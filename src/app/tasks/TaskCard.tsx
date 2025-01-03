import Link from 'next/link'
import { priorityClasses } from '@/constants/priority.constants'
import { EnumTaskPriority, ITaskResponse } from '@/types/task.types'
import { Trash } from 'lucide-react'
import React from 'react'
import useMarkAsDone from '@/hooks/tasks/useMarkAdDone'
import useMarkAsUndone from '@/hooks/tasks/useMarkAdUndone'

export default function TaskCard({
	task,
	setModalTaskId,
	setIsShow
}: {
	task: ITaskResponse
	setModalTaskId: (taskId: string) => void
	setIsShow: (state: boolean) => void
}) {
	const { handleDoneSubmit } = useMarkAsDone()
	const { handleUndoneSubmit } = useMarkAsUndone()

	const openDeleteModal = (taskId: string) => {
		setModalTaskId(taskId)
		setIsShow(true)
	}

	return (
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
					<h1 className={task.isDone ? 'line-through opacity-50 z-10' : ''}>
						{task.title}
					</h1>
					<p
						className={`ml-auto mr-5 text-sm font-medium w-fit p-1 px-8 rounded-xl min-w-32 text-center z-10 ${task.isDone ? 'opacity-50' : ''}`}
						style={{
							background: priorityClasses[task.priority as EnumTaskPriority]
						}}
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
	)
}
