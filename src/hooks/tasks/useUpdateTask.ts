import { useParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { taskService } from '@/services/task.service'
import { EnumTaskPriority, ITaskFormState } from '@/types/task.types'
import { toast } from 'sonner'

export default function useUpdateTask() {
	const { id } = useParams()
	const taskId = id ? Number(id) : 0

	const queryClient = useQueryClient()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [categoryId, setCategoryId] = useState<number>(1)
	const [priority, setPriority] = useState<EnumTaskPriority | undefined>(
		undefined
	)

	const { mutate } = useMutation({
		mutationKey: ['update task'],
		mutationFn: ({ id, data }: { id: number; data: ITaskFormState }) =>
			taskService.updateTask(id, data),
		onSuccess() {
			toast.success('Task updated successfully')

			queryClient.invalidateQueries({ queryKey: ['task'] })

			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		}
	})

	const handleSubmit = (e?: React.FormEvent) => {
		if (e) e.preventDefault()

		if (!priority) {
			toast.error('Please select a priority before submitting.')
			return
		}

		const data: ITaskFormState = { title, description, priority, categoryId }
		mutate({ id: taskId, data })
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
		handleSubmit
	}
}
