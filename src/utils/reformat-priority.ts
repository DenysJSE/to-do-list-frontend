import { EnumTaskPriority } from '@/types/task.types'

export default function reformatPriority(
	priority: string | EnumTaskPriority
): string {
	if (!priority) return ''
	const lowercased = priority.toLowerCase()
	return lowercased.charAt(0).toUpperCase() + lowercased.slice(1)
}
