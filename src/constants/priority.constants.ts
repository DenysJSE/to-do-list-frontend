import { EnumTaskPriority } from '@/types/task.types'

export const priorityClasses: Record<EnumTaskPriority, string> = {
	[EnumTaskPriority.LOW]: 'var(--low)',
	[EnumTaskPriority.MEDIUM]: 'var(--medium)',
	[EnumTaskPriority.HIGH]: 'var(--high)'
}

export const priorityClassesFlag: Record<EnumTaskPriority, string> = {
	[EnumTaskPriority.LOW]: '#A3C9E2',
	[EnumTaskPriority.MEDIUM]: '#A9D8B7',
	[EnumTaskPriority.HIGH]: '#D1A6F2'
}
