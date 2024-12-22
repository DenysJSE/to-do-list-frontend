import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import { ISubtaskFormState } from '@/types/task.types'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'

export function useCreateSubtask() {
	const { id } = useParams()

	const [title, setTitle] = useState('')
	const taskId = id ? Number(id) : 0

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['create subtask'],
		mutationFn: (data: ISubtaskFormState) => taskService.createSubtask(data),
		onSuccess() {
			setTitle('')

			queryClient
				.invalidateQueries({
					queryKey: ['subtasks']
				})
				.then(() => toast.success('Subtask created!'))
		}
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const data: ISubtaskFormState = {
			title,
			taskId
		}
		mutate(data)
	}

	return { title, setTitle, handleSubmit }
}
