import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'

export function useCategories() {
	const { data: categories = [] } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAllByUser()
	})

	return { categories }
}
