import { EnumTaskPriority } from '@/types/task.types'

export const priorityClasses: Record<EnumTaskPriority, string> = {
	[EnumTaskPriority.LOW]: 'bg-low',
	[EnumTaskPriority.MEDIUM]: 'bg-medium',
	[EnumTaskPriority.HIGH]: 'bg-high'
}

export const priorityClassesFlag: Record<EnumTaskPriority, string> = {
	[EnumTaskPriority.LOW]: '#A3C9E2',
	[EnumTaskPriority.MEDIUM]: '#A9D8B7',
	[EnumTaskPriority.HIGH]: '#D1A6F2'
}
