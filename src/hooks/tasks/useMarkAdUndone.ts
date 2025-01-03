import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { toast } from 'sonner'

export default function useMarkAsUndone() {
	const queryClient = useQueryClient()

	const { mutate: mutateUndone } = useMutation({
		mutationKey: ['mark task as undone'],
		mutationFn: (id: number) => taskService.markTaskAsUndone(id),
		onSuccess() {
			toast.success('Task is uncompleted!')

			queryClient.invalidateQueries({ queryKey: ['tasks'] })

			queryClient.invalidateQueries({ queryKey: ['category tasks'] })

			queryClient.invalidateQueries({ queryKey: ['categories'] })

			queryClient.invalidateQueries({ queryKey: ['favorite category'] })
		}
	})

	const handleUndoneSubmit = (id: number) => {
		mutateUndone(id)
	}

	return { handleUndoneSubmit }
}
