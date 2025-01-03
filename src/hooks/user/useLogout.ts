import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { useRouter } from 'next/navigation'

export default function useLogout() {
	const { push } = useRouter()

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get profile'] })
		}
	})

	const handleLogout = () => {
		mutate(undefined, {
			onSuccess: () => {
				push('/auth')
			}
		})
	}

	return { handleLogout }
}
