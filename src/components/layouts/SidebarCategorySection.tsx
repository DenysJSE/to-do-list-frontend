import { Hash } from 'lucide-react'
import { TCategoryResponse } from '@/types/category.types'
import Link from 'next/link'

enum EnumCategoryColors {
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
	title
}: {
	categories: TCategoryResponse[]
	title: string
}) {
	return (
		<div>
			<h1 className='text-placeholder font-bold text-sm mt-4 ml-2'>{title}</h1>
			{categories.map(category => (
				<Link key={category.id} href={`/categories/tasks/${category.id}`}>
					<div className='flex items-center gap-2 mt-2 py-2 px-3 rounded-xl cursor-pointer hover:bg-hover'>
						<Hash
							width={20}
							height={20}
							style={{ color: EnumCategoryColors[category.color] }}
						/>
						<p>{category.title}</p>
						{category._count.tasks > 0 && (
							<span className='ml-auto text-placeholder text-xs'>
								{category._count.tasks}
							</span>
						)}
					</div>
				</Link>
			))}
		</div>
	)
}
