import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'

export default function useMarkAsUndoneSubtask() {
	const { id } = useParams()

	const queryClient = useQueryClient()

	const { mutate: mutateUndone } = useMutation({
		mutationKey: ['mark task as undone'],
		mutationFn: (taskId: number) => taskService.markSubtaskAsUndone(taskId),
		onSuccess() {
			toast.success('Subtask is uncompleted!')

			queryClient.invalidateQueries({ queryKey: ['subtasks', id] })
		}
	})

	const handleUndoneSubmit = (id: number) => {
		mutateUndone(id)
	}

	return { handleUndoneSubmit }
}
