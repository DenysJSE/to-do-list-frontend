import { ISubtask } from '@/types/task.types'
import { Trash } from 'lucide-react'
import SubtaskTitle from '@/app/tasks/[id]/SubtaskTitle'

export default function Subtask({
	subtask,
	handleDoneSubmit,
	handleUndoneSubmit,
	deleteSubtask
}: {
	subtask: ISubtask
	handleDoneSubmit: (id: number) => void
	handleUndoneSubmit: (id: number) => void
	deleteSubtask: (id: string) => void
}) {
	return (
		<div>
			<div
				className={`flex items-center gap-4 mt-2 px-6 ${subtask.isDone ? 'opacity-50' : ''}`}
			>
				<div
					className={`w-5 h-5 rounded-full border border-button-background flex items-center justify-center cursor-pointer`}
					onClick={e => {
						e.preventDefault()
						e.stopPropagation()
						subtask.isDone
							? handleUndoneSubmit(+subtask.id)
							: handleDoneSubmit(+subtask.id)
					}}
				>
					{subtask.isDone && (
						<div className='w-3 h-3 bg-button-background rounded-full' />
					)}
				</div>
				<SubtaskTitle subtask={subtask} />
				<button onClick={() => deleteSubtask(subtask.id)} className='ml-auto'>
					<Trash width={20} height={20} color='var(--button-background)' />
				</button>
			</div>
			<hr className='mt-4 border border-border ml-5' />
		</div>
	)
}
