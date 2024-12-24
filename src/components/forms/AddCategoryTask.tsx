import React, { useEffect, useState } from 'react'
import { useCreateTask } from '@/hooks/tasks/useCreateTask'
import { useCategories } from '@/hooks/categories/useCategories'
import Loader from '@/components/ui/Loader'
import CustomPrioritySelect from '@/components/ui/CustomPrioritySelect'
import CustomCategorySelect from '@/components/ui/CustomCategorySelect'

export default function AddCategoryTask({
	setIsTaskForm
}: {
	setIsTaskForm: (isTaskForm: boolean) => void
}) {
	const {
		title,
		setTitle,
		description,
		setDescription,
		categoryId,
		setCategoryId,
		priority,
		setPriority,
		priorityValues,
		handleSubmit
	} = useCreateTask()

	const { categories, isLoadingCategories } = useCategories()

	const exampleTasks = [
		'Go to the library on Monday',
		'Clean the house at 5 AM',
		'Buy groceries for the week',
		'Call mom to catch up',
		'Finish reading a book',
		'Plan the weekend trip'
	]

	const [placeholder, setPlaceholder] = useState('')

	const getRandomTask = () => {
		const randomIndex = Math.floor(Math.random() * exampleTasks.length)
		return exampleTasks[randomIndex]
	}

	useEffect(() => {
		setPlaceholder(getRandomTask())
	}, [])

	if (isLoadingCategories) return <Loader />

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
				<input
					type='text'
					placeholder='Description'
					value={description}
					onChange={e => setDescription(e.target.value)}
					className='text-sm outline-none'
					required
				/>

				<CustomPrioritySelect
					priority={priority}
					setPriorityAction={setPriority}
					priorityValues={priorityValues}
				/>

				<hr className='my-2 border border-border' />

				<div className='flex items-center justify-between'>
					<CustomCategorySelect
						categoryId={categoryId}
						setCategoryIdAction={setCategoryId}
						categories={categories}
					/>

					<div className='flex items-center gap-2'>
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
							Crate task
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
