import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'
import { toast } from 'sonner'

export function useDeleteCategory() {
	const queryClient = useQueryClient()

	const { mutate: deleteCategory, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (id: string) => categoryService.delete(id),
		onSuccess() {
			queryClient
				.invalidateQueries({
					queryKey: ['categories']
				})
				.then(() => toast.success('Category deleted successfully!'))
		}
	})

	return { deleteCategory, isDeletePending }
}
