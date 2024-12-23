import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'

export function useCategoriesFavorite() {
	const { data: favoriteCategories = [], isLoading } = useQuery({
		queryKey: ['favorite category'],
		queryFn: () => categoryService.getFavorites()
	})

	const isLoadingFavorite = isLoading

	return { favoriteCategories, isLoadingFavorite }
}
