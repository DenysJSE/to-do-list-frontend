import { useQuery } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { useParams } from 'next/navigation'

export function useTask() {
	const { id } = useParams()

	const { data: task } = useQuery({
		queryKey: ['task', id],
		queryFn: () => taskService.getById(id as string),
		enabled: !!id
	})

	return { task }
}
