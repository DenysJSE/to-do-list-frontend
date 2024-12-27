import { useCreateSubtask } from '@/hooks/tasks/useCreateSubtask'
import React from 'react'
import useSetTitlePlaceholder from '@/hooks/useSetTitlePlaceholder'

export default function AddSubtask({
	setIsTaskForm
}: {
	setIsTaskForm: (isTaskForm: boolean) => void
}) {
	const { title, setTitle, handleSubmit } = useCreateSubtask()

	const { placeholder } = useSetTitlePlaceholder()

	return (
		<div className='border border-placeholder rounded-xl p-4'>
			<form onSubmit={handleSubmit} className='flex flex-col gap-1'>
				<input
					type='text'
					placeholder={placeholder}
					value={title}
					onChange={e => setTitle(e.target.value)}
					className='font-medium outline-none'
					required
				/>

				<div className='flex items-center gap-2 mt-4 ml-auto'>
					<button
						type='submit'
						className='bg-border p-2 px-4 text-sm font-bold rounded-lg'
						onClick={() => setIsTaskForm(false)}
					>
						Cancel
					</button>
					<button
						type='submit'
						className='bg-button-background text-white p-2 px-4 text-sm font-bold rounded-lg'
					>
						Crate subtask
					</button>
				</div>
			</form>
		</div>
	)
}
