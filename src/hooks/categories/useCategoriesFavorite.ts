import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'

export function useCategoriesFavorite() {
	const { data: favoriteCategories = [] } = useQuery({
		queryKey: ['favorite category'],
		queryFn: () => categoryService.getFavorites()
	})

	return { favoriteCategories }
}
