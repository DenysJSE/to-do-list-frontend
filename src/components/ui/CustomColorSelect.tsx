import React from 'react'
import { useOutside } from '@/hooks/useOutside'
import { EnumCategoryColor } from '@/types/category.types'
import { PaintRoller } from 'lucide-react'
import { EnumCategoryColors } from '@/constants/category-colors.constants'

export default function CustomColorSelect({
	color,
	setColorAction,
	colorValues
}: {
	color: EnumCategoryColor
	setColorAction: (color: EnumCategoryColor) => void
	colorValues: EnumCategoryColor[]
}) {
	const { isShow, setIsShow, ref } = useOutside(false)

	return (
		<div ref={ref} className='w-fit'>
			<div
				className='border border-placeholder rounded-md p-1 px-3 w-fit text-center appearance-none mt-2 text-sm flex items-center gap-2 cursor-pointer'
				onClick={() => setIsShow(!isShow)}
			>
				<PaintRoller width={15} height={15} color={EnumCategoryColors[color]} />
				<h1>{color || 'Select category color'}</h1>
			</div>

			{isShow && (
				<div className='absolute bg-background border border-placeholder rounded-md w-[180px] h-60 overflow-auto appearance-none mt-1 text-sm flex flex-col z-50'>
					{colorValues.map(c => (
						<p
							key={c}
							className={`option ${c === color ? 'active' : ''}`}
							onClick={() => {
								setColorAction(c)
								setIsShow(false)
							}}
						>
							<PaintRoller
								width={15}
								height={15}
								color={EnumCategoryColors[c]}
							/>
							{c}
						</p>
					))}
				</div>
			)}
		</div>
	)
}
