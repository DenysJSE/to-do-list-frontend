import React, { useEffect, useState } from 'react'

export function useEditableInput(
	ref: React.RefObject<HTMLElement>,
	handleSubmit: () => void
) {
	const [isEditInput, setIsEditInput] = useState(false)

	useEffect(() => {
		if (isEditInput) {
			const handleClickOutside = (e: MouseEvent) => {
				if (ref.current && !ref.current.contains(e.target as Node)) {
					handleSubmit()
					setIsEditInput(false)
				}
			}

			document.addEventListener('mousedown', handleClickOutside)

			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}
	}, [isEditInput, handleSubmit, ref])

	return { isEditInput, setIsEditInput }
}
