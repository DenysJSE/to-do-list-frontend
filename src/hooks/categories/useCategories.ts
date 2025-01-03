import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'
import useGetProfile from '@/hooks/user/useGetProfile'

export function useCategories() {
	const { user } = useGetProfile()

	const { data: categories = [], isLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAllByUser(),
		enabled: !!user
	})

	const isLoadingCategories = isLoading

	return { categories, isLoadingCategories }
}
