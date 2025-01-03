'use client'

import { CirclePlus, Inbox, LogOut, UserRound } from 'lucide-react'
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
import useGetProfile from '@/hooks/user/useGetProfile'
import useLogout from '@/hooks/user/useLogout'

export default function Sidebar() {
	const currentPath = usePathname()

	const [isFavorite, setIsFavorite] = useState(false)
	const [isTaskForm, setIsTaskForm] = useState(false)
	const [isHoverSidebar, setIsHoverSidebar] = useState(false)

	const { categories, isLoadingCategories } = useCategories()
	const { favoriteCategories, isLoadingFavorite } = useCategoriesFavorite()

	const { tasks } = useTasks()

	const { user } = useGetProfile()
	const { handleLogout } = useLogout()

	const { ref, isShow, setIsShow } = useOutside(false)

	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		if (user) setIsLoggedIn(true)
	}, [user])

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
			<aside
				className='w-[300px] bg-sidebar-background fixed top-0 bottom-0 left-0 py-6 px-4 flex flex-col gap-2 z-50'
				onMouseEnter={() => setIsHoverSidebar(true)}
				onMouseLeave={() => setIsHoverSidebar(false)}
			>
				{isLoggedIn && (
					<>
						<div className='flex items-center gap-2 py-2 px-3 rounded-xl'>
							<UserRound width={22} height={22} />
							<h1 className='font-medium text-lg'>{user?.name}</h1>
							<LogOut
								width={18}
								height={18}
								className='ml-auto rotate-180 cursor-pointer'
								onClick={() => handleLogout()}
							/>
						</div>
						<hr className='text-border' />
					</>
				)}
				<div
					className='flex items-center gap-2 py-2 px-3 mt-2 rounded-xl cursor-pointer hover:bg-hover'
					onClick={() => {
						setIsShow(true)
						setIsTaskForm(true)
					}}
				>
					<CirclePlus width={24} height={24} color={'#DC4C3E'} />
					<h1 className='font-bold text-button-background'>Add task</h1>
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

				{isFavorite && (
					<SidebarCategoriesSection
						categories={favoriteCategories}
						title='Favorite'
						isFavorite={true}
					/>
				)}

				<div>
					<SidebarCategoriesSection
						categories={categories}
						title='My Categories'
						isFavorite={false}
						isHoverSidebar={isHoverSidebar}
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
