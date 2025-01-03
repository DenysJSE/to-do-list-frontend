import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'
import useGetProfile from '@/hooks/user/useGetProfile'

export function useCategoriesFavorite() {
	const { user } = useGetProfile()

	const { data: favoriteCategories = [], isLoading } = useQuery({
		queryKey: ['favorite category'],
		queryFn: () => categoryService.getFavorites(),
		enabled: !!user
	})

	const isLoadingFavorite = isLoading

	return { favoriteCategories, isLoadingFavorite }
}
