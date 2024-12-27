import { useEffect, useState } from 'react'

export default function useSetTitlePlaceholder() {
	const exampleTasks = [
		'Go to the library on Monday',
		'Clean the house at 5 AM',
		'Buy groceries for the week',
		'Call mom to catch up',
		'Finish reading a book',
		'Plan the weekend trip'
	]

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
