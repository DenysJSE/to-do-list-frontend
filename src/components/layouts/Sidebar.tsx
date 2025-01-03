'use client'

import React, { useState } from 'react'
import { useCategories } from '@/hooks/categories/useCategories'
import { useCategoriesFavorite } from '@/hooks/categories/useCategoriesFavorite'
import SidebarCategoriesSection from '@/components/layouts/SidebarCategorySection'
import Loader from '@/components/ui/Loader'
import { usePathname } from 'next/navigation'
import { useOutside } from '@/hooks/useOutside'
import AddCategoryTask from '@/components/forms/AddCategoryTask'
import SidebarTopSection from '@/components/ui/SidebarTopSection'

export default function Sidebar() {
	const currentPath = usePathname()

	const [isFavorite, setIsFavorite] = useState(false)
	const [isTaskForm, setIsTaskForm] = useState(false)
	const [isHoverSidebar, setIsHoverSidebar] = useState(false)

	const { categories, isLoadingCategories } = useCategories()
	const { favoriteCategories, isLoadingFavorite } = useCategoriesFavorite()

	const { ref, isShow, setIsShow } = useOutside(false)

	if (isLoadingCategories || isLoadingFavorite) return <Loader />

	return (
		currentPath !== '/auth' && (
			<>
				<aside
					className='w-[300px] bg-sidebar-background fixed top-0 bottom-0 left-0 py-6 px-4 flex flex-col gap-2 z-50'
					onMouseEnter={() => setIsHoverSidebar(true)}
					onMouseLeave={() => setIsHoverSidebar(false)}
				>
					<SidebarTopSection
						favoriteCategories={favoriteCategories}
						setIsFavorite={setIsFavorite}
						setIsShow={setIsShow}
						setIsTaskForm={setIsTaskForm}
						currentPath={currentPath}
					/>

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
	)
}
