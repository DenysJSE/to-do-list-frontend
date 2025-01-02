import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'
import { EnumCategoryColor, ICategoryFormState } from '@/types/category.types'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'

export default function useUpdateCategory() {
	const { id } = useParams()
	const categoryId = id ? Number(id) : 0

	const colorValues = Object.values(EnumCategoryColor)

	const queryClient = useQueryClient()

	const [title, setTitle] = useState('')
	const [color, setColor] = useState<EnumCategoryColor>(colorValues[0])

	const { mutate } = useMutation({
		mutationKey: ['update category'],
		mutationFn: ({ id, data }: { id: number; data: ICategoryFormState }) =>
			categoryService.update(id, data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['category'] })

			queryClient.invalidateQueries({ queryKey: ['categories'] })

			queryClient.invalidateQueries({ queryKey: ['favorite categories'] })
		}
	})

	const handleSubmit = (e?: React.FormEvent) => {
		if (e) e.preventDefault()
		const data: ICategoryFormState = { title, color }
		mutate({ id: categoryId, data })
	}

	return {
		title,
		setTitle,
		color,
		setColor,
		handleSubmit
	}
}
