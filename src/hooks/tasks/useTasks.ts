import { useQuery } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'

export function useTasks() {
	const { data: tasks = [] } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getAllByUser()
	})

	return { tasks }
}
