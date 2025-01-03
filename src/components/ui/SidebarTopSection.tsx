import { CirclePlus, Inbox, LogOut, UserRound } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTasks } from '@/hooks/tasks/useTasks'
import useLogout from '@/hooks/user/useLogout'
import useGetProfile from '@/hooks/user/useGetProfile'
import { TCategoryResponse } from '@/types/category.types'

export default function SidebarTopSection({
	favoriteCategories,
	setIsFavorite,
	setIsShow,
	setIsTaskForm,
	currentPath
}: {
	favoriteCategories: TCategoryResponse[]
	setIsFavorite: (state: boolean) => void
	setIsShow: (state: boolean) => void
	setIsTaskForm: (state: boolean) => void
	currentPath: string
}) {
	const { tasks } = useTasks()
	const { handleLogout } = useLogout()
	const { user } = useGetProfile()
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

	return (
		<>
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
		</>
	)
}
