import { Hash, Plus, Star } from 'lucide-react'
import { TCategoryResponse } from '@/types/category.types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useOutside } from '@/hooks/useOutside'
import AddCategory from '@/components/forms/AddCategory'
import { EnumCategoryColors } from '@/constants/category-colors.constants'
import useAddCategoryToFavorite from '@/hooks/categories/useAddCategoryToFavorite'
import useRemoveCategoryFromFavorite from '@/hooks/categories/useRemoveCategoryFromFavorite'

export default function SidebarCategoriesSection({
	categories,
	title,
	isFavorite,
	isHoverSidebar
}: {
	categories: TCategoryResponse[]
	title: string
	isFavorite: boolean
	isHoverSidebar?: boolean
}) {
	const currentPath = usePathname()

	const { handleAddToFavorite } = useAddCategoryToFavorite()
	const { handleRemoveFromFavorite } = useRemoveCategoryFromFavorite()

	const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
		null
	)

	const { isShow, setIsShow, ref } = useOutside(false)

	return (
		<div>
			<div className='flex items-center justify-between mt-4'>
				<h1 className='text-placeholder font-bold text-sm ml-2'>{title}</h1>
				{!isFavorite && isHoverSidebar && (
					<Plus
						width={17}
						height={17}
						color='gray'
						className='mr-2 cursor-pointer'
						onClick={() => setIsShow(true)}
					/>
				)}
			</div>

			{isShow && <AddCategory setIsShow={setIsShow} ref={ref} />}

			{categories.map(category => (
				<Link key={category.id} href={`/categories/tasks/${category.id}`}>
					<div
						className={`flex items-center gap-2 mt-2 py-2 px-3 rounded-xl cursor-pointer
							${
								currentPath === `/categories/tasks/${category.id}`
									? 'bg-hover'
									: 'hover:bg-hover'
							}`}
						onMouseEnter={() => setHoveredCategoryId(category.id)}
						onMouseLeave={() => setHoveredCategoryId(null)}
					>
						<Hash
							width={20}
							height={20}
							style={{ color: EnumCategoryColors[category.color] }}
						/>
						<p>{category.title}</p>
						{hoveredCategoryId === category.id ? (
							<Star
								width={15}
								className='ml-auto'
								onClick={e => {
									e.preventDefault()
									e.stopPropagation()
									category.isFavorite
										? handleRemoveFromFavorite(+category.id)
										: handleAddToFavorite(+category.id)
								}}
							/>
						) : (
							category._count.tasks > 0 && (
								<span className='ml-auto mr-1 text-placeholder text-xs'>
									{category._count.tasks}
								</span>
							)
						)}
					</div>
				</Link>
			))}
		</div>
	)
}
