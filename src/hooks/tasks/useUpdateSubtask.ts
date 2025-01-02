import { useParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { ISubtaskFormState } from '@/types/task.types'
import { taskService } from '@/services/task.service'

export default function useUpdateSubtask() {
	const { id } = useParams()
	const taskId = id ? Number(id) : 0

	const queryClient = useQueryClient()

	const [title, setTitle] = useState('')
	const [subtaskId, setSubtaskId] = useState(1)

	const { mutate } = useMutation({
		mutationKey: ['update subtask'],
		mutationFn: ({ id, data }: { id: number; data: ISubtaskFormState }) =>
			taskService.updateSubtask(id, data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['task'] })

			queryClient.invalidateQueries({ queryKey: ['subtasks'] })
		}
	})

	const handleSubmit = (e?: React.FormEvent) => {
		if (e) e.preventDefault()

		const data: ISubtaskFormState = { title, taskId }
		mutate({ id: subtaskId, data })
	}

	return {
		title,
		setTitle,
		subtaskId,
		setSubtaskId,
		handleSubmit
	}
}
