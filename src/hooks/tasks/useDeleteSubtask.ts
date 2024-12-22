import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { toast } from 'sonner'

export function useDeleteSubtask() {
	const queryClient = useQueryClient()

	const { mutate: deleteSubtask, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete subtask'],
		mutationFn: (id: string) => taskService.deleteSubtask(id),
		onSuccess() {
			queryClient
				.invalidateQueries({
					queryKey: ['subtasks']
				})
				.then(() => toast.success('Subtask deleted successfully!'))
		}
	})

	return { deleteSubtask, isDeletePending }
}
