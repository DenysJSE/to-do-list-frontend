'use client'

import { useQuery } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { useParams } from 'next/navigation'

export function useCategoryTasks() {
	const { id } = useParams()

	const { data: tasks = [] } = useQuery({
		queryKey: ['category tasks'],
		queryFn: () => taskService.getAllByCategory(id as string),
		enabled: !!id
	})

	return { tasks }
}
