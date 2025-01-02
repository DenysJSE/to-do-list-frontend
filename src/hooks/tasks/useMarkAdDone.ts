import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { toast } from 'sonner'

export default function useMarkAsDone() {
	const queryClient = useQueryClient()

	const { mutate: mutateDone } = useMutation({
		mutationKey: ['mark task as done'],
		mutationFn: (id: number) => taskService.markTaskAsDone(id),
		onSuccess() {
			toast.success('Task is completed!')

			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})

			queryClient.invalidateQueries({ queryKey: ['category tasks'] })

			queryClient.invalidateQueries({ queryKey: ['categories'] })

			queryClient.invalidateQueries({ queryKey: ['favorite category'] })
		}
	})

	const handleDoneSubmit = (id: number) => {
		mutateDone(id)
	}

	return { handleDoneSubmit }
}
