import { useQuery } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import useGetProfile from '@/hooks/user/useGetProfile'

export function useTasks() {
	const { user } = useGetProfile()

	const { data: tasks = [], isLoading } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getAllByUser(),
		enabled: !!user
	})

	return { tasks, isLoading }
}
