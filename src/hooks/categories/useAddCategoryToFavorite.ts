import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'
import { toast } from 'sonner'

export default function useAddCategoryToFavorite() {
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['add category to favorite'],
		mutationFn: (id: number) => categoryService.addToFavorite(id),
		onSuccess() {
			toast.success('Category added to favorite!')

			queryClient.invalidateQueries({ queryKey: ['favorite category'] })
		}
	})

	const handleAddToFavorite = (categoryId: number) => {
		mutate(categoryId)
	}

	return { handleAddToFavorite }
}
