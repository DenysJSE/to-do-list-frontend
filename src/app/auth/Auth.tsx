'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { IAuth } from '@/types/auth.types'
import { authService } from '@/services/auth.service'
import { toast } from 'sonner'
import { APP_PAGES } from '@/config/pages-url.config'

export default function Auth() {
	const { register, handleSubmit, reset } = useForm<IAuth>({
		mode: 'onChange'
	})

	const [isLoginForm, setIsLoginForm] = useState(false)

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuth) =>
			authService.auth(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfully login!')
			reset()
			push(APP_PAGES.HOME)
		}
	})

	const onSubmit: SubmitHandler<IAuth> = data => {
		mutate(data)
	}

	return (
		<div className='w-screen h-screen flex justify-center items-center '>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='px-10 py-20 bg-gray-200'
			>
				<div className='flex flex-col gap-4'>
					<input
						type='email'
						placeholder='Email'
						{...register('email', {
							required: 'Email is required!'
						})}
					/>

					<input
						type='password'
						placeholder='Password'
						{...register('password', {
							required: 'Password is required!'
						})}
					/>

					{!isLoginForm && (
						<input
							type='text'
							placeholder='Name'
							{...register('name', {
								required: 'Name is required!'
							})}
						/>
					)}

					<button type='submit'>{isLoginForm ? 'Login' : 'Register'}</button>
				</div>
			</form>
			<button onClick={() => setIsLoginForm(!isLoginForm)}>
				Let's {isLoginForm ? 'Register' : 'Login'}
			</button>
		</div>
	)
}
