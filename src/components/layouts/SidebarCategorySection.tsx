import { Hash, Plus, Star } from 'lucide-react'
import { TCategoryResponse } from '@/types/category.types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'
import { toast } from 'sonner'
import { useOutside } from '@/hooks/useOutside'
import AddCategory from '@/components/forms/AddCategory'

export enum EnumCategoryColors {
	BlushPink = '#F6A6B8',
	CoralRed = '#F28D7B',
	AmberGold = '#D4B373',
	OceanBlue = '#9FC7E7',
	EmeraldGreen = '#A2D6A7',
	SapphireBlue = '#A5C8E7',
	LavenderPurple = '#B8A1D2',
	SunsetOrange = '#F0B87B',
	MintGreen = '#A4D6B6',
	CrimsonRed = '#E29595',
	SteelGray = '#B7BCC1',
	SlateBlue = '#A5B9D9',
	Rosewood = '#F1A7A7',
	IvoryWhite = '#F2E2C4',
	ChocolateBrown = '#C9A88C',
	ForestGreen = '#A7D9A4',
	SkyBlue = '#A3C7E9',
	GoldenYellow = '#E4C180',
	MidnightBlack = '#D8D8D8',
	PeachPink = '#F2C8A3'
}

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

	const queryClient = useQueryClient()

	const { mutate: addToFavorite } = useMutation({
		mutationKey: ['add category to favorite'],
		mutationFn: (id: number) => categoryService.addToFavorite(id),
		onSuccess() {
			toast.success('Category added to favorite!')

			queryClient.invalidateQueries({ queryKey: ['favorite category'] })
		}
	})

	const { mutate: removeFromFavorite } = useMutation({
		mutationKey: ['remove category to favorite'],
		mutationFn: (id: number) => categoryService.removeFromFavorite(id),
		onSuccess() {
			toast.success('Category removed from favorite!')

			queryClient.invalidateQueries({ queryKey: ['favorite category'] })
		}
	})

	const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
		null
	)

	const { isShow, setIsShow, ref } = useOutside(false)

	const handleAddToFavorite = (categoryId: number) => {
		addToFavorite(categoryId)
	}

	const handleRemoveFromFavorite = (categoryId: number) => {
		removeFromFavorite(categoryId)
	}

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
