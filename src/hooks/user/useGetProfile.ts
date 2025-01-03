import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'

export default function useGetProfile() {
	const { data: user } = useQuery({
		queryKey: ['get profile'],
		queryFn: () => userService.getProfile()
	})

	return { user }
}
