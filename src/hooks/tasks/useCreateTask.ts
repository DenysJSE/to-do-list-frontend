import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { EnumTaskPriority, ITaskFormState } from '@/types/task.types'
import { toast } from 'sonner'
import React, { useState } from 'react'

export const priorityClasses: Record<EnumTaskPriority, string> = {
	[EnumTaskPriority.LOW]: 'LOW',
	[EnumTaskPriority.MEDIUM]: 'MEDIUM',
	[EnumTaskPriority.HIGH]: 'HIGH'
}

export function useCreateTask() {
	const priorityValues = Object.values(EnumTaskPriority)

	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [categoryId, setCategoryId] = useState<number>(1)
	const [priority, setPriority] = useState<EnumTaskPriority | null>(null)

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['create task'],
		mutationFn: (data: ITaskFormState) => taskService.createTask(data),
		onSuccess() {
			setTitle('')
			setDescription('')
			setCategoryId(1)
			setPriority(null)

			queryClient
				.invalidateQueries({
					queryKey: ['tasks']
				})
				.then(() => toast.success('Successfully created!'))

			queryClient
				.invalidateQueries({ queryKey: ['category tasks'] })
				.then(() => toast.success('Successfully created!'))

			queryClient.invalidateQueries({ queryKey: ['categories'] })

			queryClient.invalidateQueries({ queryKey: ['favorite category'] })
		}
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!priority) {
			toast.error('Please select a priority before submitting.')
			return
		}

		const data: ITaskFormState = {
			title,
			description,
			categoryId,
			priority
		}
		mutate(data)
	}

	return {
		title,
		setTitle,
		description,
		setDescription,
		categoryId,
		setCategoryId,
		priority,
		setPriority,
		handleSubmit,
		priorityValues
	}
}
