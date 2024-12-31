'use client'

import { CirclePlus, Inbox, LayoutGrid, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCategories } from '@/hooks/categories/useCategories'
import { useCategoriesFavorite } from '@/hooks/categories/useCategoriesFavorite'
import SidebarCategoriesSection from '@/components/layouts/SidebarCategorySection'
import { useTasks } from '@/hooks/tasks/useTasks'
import Loader from '@/components/ui/Loader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
	const currentPath = usePathname()

	const [isFavorite, setIsFavorite] = useState(false)

	const { categories, isLoadingCategories } = useCategories()
	const { favoriteCategories, isLoadingFavorite } = useCategoriesFavorite()

	const { tasks } = useTasks()

	useEffect(() => {
		if (favoriteCategories.length > 0) {
			setIsFavorite(true)
		} else {
			setIsFavorite(false)
		}
	}, [favoriteCategories])

	if (isLoadingCategories || isLoadingFavorite) return <Loader />

	return (
		<aside className='w-[300px] bg-sidebar-background fixed top-0 bottom-0 left-0 py-6 px-4 flex flex-col'>
			<div className='flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer hover:bg-hover'>
				<CirclePlus width={24} height={24} color={'#DC4C3E'} />
				<h1 className='font-bold text-button-background'>Add task</h1>
			</div>
			<div className='flex items-center gap-2 mt-4 py-2 px-3 rounded-xl cursor-pointer hover:bg-hover'>
				<Search width={20} height={20} />
				<h1>Search</h1>
			</div>
			<Link
				href={'/tasks'}
				className={currentPath === '/tasks' ? 'bg-hover rounded-xl' : ''}
			>
				<div className='flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer hover:bg-hover'>
					<Inbox width={20} height={20} />
					<h1>All my tasks</h1>
					{tasks.filter(task => !task.isDone).length > 0 && (
						<span className='ml-auto text-placeholder text-xs'>
							{tasks.filter(task => !task.isDone).length}
						</span>
					)}
				</div>
			</Link>
			<div className='flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer hover:bg-hover'>
				<LayoutGrid width={20} height={20} />
				<h1>Filters</h1>
			</div>

			{isFavorite && (
				<SidebarCategoriesSection
					categories={favoriteCategories}
					title='Favorite'
				/>
			)}

			<div>
				<SidebarCategoriesSection
					categories={categories}
					title='My Categories'
				/>
			</div>
		</aside>
	)
}
