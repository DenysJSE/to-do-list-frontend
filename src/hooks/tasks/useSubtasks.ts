import { useQuery } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { useParams } from 'next/navigation'

export function useSubtasks() {
	const { id } = useParams()

	const { data: subtasks = [] } = useQuery({
		queryKey: ['subtasks', id],
		queryFn: () => taskService.getSubtaskByTask(id as string),
		enabled: !!id
	})

	return { subtasks }
}
