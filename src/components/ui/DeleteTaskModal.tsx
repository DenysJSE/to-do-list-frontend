import React from 'react'

export default function DeleteTaskModal({
	ref,
	setIsShow,
	deleteTask,
	id
}: {
	ref: React.RefObject<HTMLDivElement>
	setIsShow: (showState: boolean) => void
	deleteTask: (taskId: string) => void
	id: string
}) {
	return (
		<div className='absolute top-0 left-0 z-50 w-full h-full flex justify-center pt-52 overflow-hidden bg-black bg-opacity-50'>
			<div
				className='h-fit bg-background py-6 px-4 w-[450px] rounded-xl flex flex-col gap-2'
				ref={ref}
			>
				<h1 className='font-medium'>Delete task?</h1>
				<p className='text-sm'>The task will be permanently deleted!</p>
				<div className='flex gap-2 ml-auto mt-4'>
					<button
						type='submit'
						className='bg-border p-2 px-4 text-sm font-bold rounded-lg'
						onClick={() => setIsShow(false)}
					>
						Cancel
					</button>
					<button
						type='submit'
						className='bg-button-background text-white p-2 px-4 text-sm font-bold rounded-lg'
						onClick={() => {
							setIsShow(false)
							deleteTask(id)
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	)
}
