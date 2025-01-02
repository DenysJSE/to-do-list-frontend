import { Flag, Hash } from 'lucide-react'
import { priorityClassesFlag } from '@/constants/priority.constants'
import reformatPriority from '@/utils/reformat-priority'
import React from 'react'
import { ITaskResponse } from '@/types/task.types'

export default function TaskSidebar({
	task
}: {
	task: ITaskResponse | undefined
}) {
	return (
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
	)
}
