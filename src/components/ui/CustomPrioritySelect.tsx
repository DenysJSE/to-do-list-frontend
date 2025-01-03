'use client'

import { Flag } from 'lucide-react'
import { useOutside } from '@/hooks/useOutside'
import { EnumTaskPriority } from '@/types/task.types'
import React from 'react'
import { priorityClasses } from '@/constants/priority.constants'

interface ICustomSelect {
	priority: EnumTaskPriority | null
	setPriorityAction: (priority: EnumTaskPriority) => void
	priorityValues: EnumTaskPriority[]
}

export default function CustomPrioritySelect({
	priority,
	setPriorityAction,
	priorityValues
}: ICustomSelect) {
	const { isShow, setIsShow, ref } = useOutside(false)

	return (
		<div ref={ref} className='w-fit'>
			<div
				className='border border-placeholder rounded-md p-1 px-3 w-fit text-center appearance-none mt-2 text-sm flex items-center gap-2 cursor-pointer'
				onClick={() => setIsShow(!isShow)}
			>
				<Flag
					width={16}
					height={16}
					style={{
						color: priority ? priorityClasses[priority] : '#000'
					}}
				/>
				<h1>{priority || 'Select Priority'}</h1>
			</div>

			{isShow && (
				<div className='absolute bg-background border border-placeholder rounded-md w-[136px] appearance-none mt-1 text-sm flex flex-col z-50'>
					{priorityValues.map(p => (
						<p
							key={p}
							className={`option ${p === priority ? 'active' : ''}`}
							onClick={() => {
								setPriorityAction(p)
								setIsShow(false)
							}}
						>
							<Flag
								width={16}
								height={16}
								style={{
									color: priorityClasses[p]
								}}
							/>
							{p}
						</p>
					))}
				</div>
			)}
		</div>
	)
}
