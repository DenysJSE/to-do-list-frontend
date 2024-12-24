import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { taskService } from '@/services/task.service'

export function useDeleteTask() {
	const queryClient = useQueryClient()

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete task'],
		mutationFn: (id: string) => taskService.deleteTask(id),
		onSuccess() {
			queryClient
				.invalidateQueries({
					queryKey: ['tasks']
				})
				.then(() => toast.success('Task deleted successfully!'))

			queryClient
				.invalidateQueries({ queryKey: ['category tasks'] })
				.then(() => toast.success('Task deleted successfully!'))

			queryClient.invalidateQueries({ queryKey: ['categories'] })

			queryClient.invalidateQueries({ queryKey: ['favorite category'] })
		}
	})

	return { deleteTask, isDeletePending }
}
