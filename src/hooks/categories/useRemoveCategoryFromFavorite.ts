import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'
import { toast } from 'sonner'

export default function useRemoveCategoryFromFavorite() {
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['remove category to favorite'],
		mutationFn: (id: number) => categoryService.removeFromFavorite(id),
		onSuccess() {
			toast.success('Category removed from favorite!')

			queryClient.invalidateQueries({ queryKey: ['favorite category'] })
		}
	})

	const handleRemoveFromFavorite = (categoryId: number) => {
		mutate(categoryId)
	}

	return { handleRemoveFromFavorite }
}
