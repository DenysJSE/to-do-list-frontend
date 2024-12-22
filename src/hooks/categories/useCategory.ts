import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'

export function useCategory() {
	const { id } = useParams()

	const { data: category } = useQuery({
		queryKey: ['category'],
		queryFn: () => categoryService.getById(id as string),
		enabled: !!id
	})

	return { category }
}
