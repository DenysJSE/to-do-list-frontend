import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'

export default function useMarkAsDoneSubtask() {
	const { id } = useParams()

	const queryClient = useQueryClient()

	const { mutate: mutateDone } = useMutation({
		mutationKey: ['mark task as done'],
		mutationFn: (taskId: number) => taskService.markSubtaskAsDone(taskId),
		onSuccess() {
			toast.success('Subtask is completed!')

			queryClient.invalidateQueries({ queryKey: ['subtasks', id] })
		}
	})

	const handleDoneSubmit = (id: number) => {
		mutateDone(id)
	}

	return { handleDoneSubmit }
}
