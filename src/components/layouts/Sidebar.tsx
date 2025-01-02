'use client'

import { CirclePlus, Inbox, LayoutGrid, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useCategories } from '@/hooks/categories/useCategories'
import { useCategoriesFavorite } from '@/hooks/categories/useCategoriesFavorite'
import SidebarCategoriesSection from '@/components/layouts/SidebarCategorySection'
import { useTasks } from '@/hooks/tasks/useTasks'
import Loader from '@/components/ui/Loader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useOutside } from '@/hooks/useOutside'
import AddCategoryTask from '@/components/forms/AddCategoryTask'

export default function Sidebar() {
	const currentPath = usePathname()

	const [isFavorite, setIsFavorite] = useState(false)
	const [isTaskForm, setIsTaskForm] = useState(false)

	const { categories, isLoadingCategories } = useCategories()
	const { favoriteCategories, isLoadingFavorite } = useCategoriesFavorite()

	const { tasks } = useTasks()

	const { ref, isShow, setIsShow } = useOutside(false)

	useEffect(() => {
		if (favoriteCategories.length > 0) {
			setIsFavorite(true)
		} else {
			setIsFavorite(false)
		}
	}, [favoriteCategories])

	if (isLoadingCategories || isLoadingFavorite) return <Loader />

	return (
		<>
			<aside className='w-[300px] bg-sidebar-background fixed top-0 bottom-0 left-0 py-6 px-4 flex flex-col'>
				<div
					className='flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer hover:bg-hover'
					onClick={() => {
						setIsShow(true)
						setIsTaskForm(true)
					}}
				>
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
			{isTaskForm && isShow && (
				<div
					ref={ref}
					className='absolute bg-background min-w-[500px] top-[25%] left-[50%] -translate-x-[50%] -translate-y-[25%] z-50 rounded-xl shadow-[0_10px_50px_10px_rgba(0,0,0,0.3)]'
				>
					<AddCategoryTask setIsTaskForm={setIsTaskForm} />
				</div>
			)}
		</>
	)
}
