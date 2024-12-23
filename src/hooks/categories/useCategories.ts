import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'

export function useCategories() {
	const { data: categories = [], isLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAllByUser()
	})

	const isLoadingCategories = isLoading

	return { categories, isLoadingCategories }
}
