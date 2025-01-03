import { useEffect, useState } from 'react'
import { exampleTasks } from '@/constants/task-title-phrases.constants'

export default function useSetTitlePlaceholder() {
	const [placeholder, setPlaceholder] = useState('')

	const getRandomTask = () => {
		const randomIndex = Math.floor(Math.random() * exampleTasks.length)
		return exampleTasks[randomIndex]
	}

	useEffect(() => {
		setPlaceholder(getRandomTask())
	}, [])

	return { placeholder }
}
