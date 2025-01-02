import React, { RefObject } from 'react'
import { useCreateCategory } from '@/hooks/categories/useCreateCategory'
import CustomColorSelect from '@/components/ui/CustomColorSelect'

export default function AddCategory({
	setIsShow,
	ref
}: {
	setIsShow: (state: boolean) => void
	ref: RefObject<HTMLDivElement>
}) {
	const { title, setTitle, color, setColor, colorValues, handleSubmit } =
		useCreateCategory()

	return (
		<div className='absolute top-0 left-0 w-screen h-screen flex justify-center pt-52 overflow-hidden bg-black bg-opacity-50 z-50'>
			<div ref={ref} className='h-fit'>
				<form
					onSubmit={e => {
						e.preventDefault()
						handleSubmit(e)
						setIsShow(false)
					}}
					className='h-fit bg-background py-6 px-4 w-[450px] rounded-xl flex flex-col gap-2'
				>
					<input
						type='text'
						placeholder='Eneter title of category'
						value={title}
						onChange={e => setTitle(e.target.value)}
						className='font-medium outline-none'
						required
					/>

					<CustomColorSelect
						color={color}
						colorValues={colorValues}
						setColorAction={setColor}
					/>

					<div className='flex items-center gap-2 mt-4 ml-auto'>
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
						>
							Crate subtask
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
