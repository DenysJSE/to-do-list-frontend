import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EnumCategoryColor, ICategoryFormState } from '@/types/category.types'
import { categoryService } from '@/services/category.service'
import { toast } from 'sonner'
import React, { useState } from 'react'

export const categoryColorClasses: Record<EnumCategoryColor, string> = {
	[EnumCategoryColor.BlushPink]: 'bg-blush-pink',
	[EnumCategoryColor.CoralRed]: 'bg-coral-red',
	[EnumCategoryColor.AmberGold]: 'bg-amber-gold',
	[EnumCategoryColor.OceanBlue]: 'bg-ocean-blue',
	[EnumCategoryColor.EmeraldGreen]: 'bg-emerald-green',
	[EnumCategoryColor.SapphireBlue]: 'bg-sapphire-blue',
	[EnumCategoryColor.LavenderPurple]: 'bg-lavender-purple',
	[EnumCategoryColor.SunsetOrange]: 'bg-sanset-orange',
	[EnumCategoryColor.MintGreen]: 'bg-mint-green',
	[EnumCategoryColor.CrimsonRed]: 'bg-crimson-red',
	[EnumCategoryColor.SteelGray]: 'bg-steel-gray',
	[EnumCategoryColor.SlateBlue]: 'bg-slate-blue',
	[EnumCategoryColor.Rosewood]: 'bg-rosewood',
	[EnumCategoryColor.IvoryWhite]: 'bg-ivory-white',
	[EnumCategoryColor.ChocolateBrown]: 'bg-chocolate-brown',
	[EnumCategoryColor.ForestGreen]: 'bg-forest-green',
	[EnumCategoryColor.SkyBlue]: 'bg-sky-blue',
	[EnumCategoryColor.GoldenYellow]: 'bg-golden-yellow',
	[EnumCategoryColor.MidnightBlack]: 'bg-midnight-black',
	[EnumCategoryColor.PeachPink]: 'bg-peach-pink'
}

export function useCreateCategory() {
	const colorValues = Object.values(EnumCategoryColor)

	const [title, setTitle] = useState('')
	const [color, setColor] = useState<EnumCategoryColor>(colorValues[0])

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['category'],
		mutationFn: (data: ICategoryFormState) =>
			categoryService.createCategory(data),
		onSuccess(newCategory) {
			toast.success('Successfully created!')

			setTitle('')
			setColor(colorValues[0])

			queryClient
				.invalidateQueries({
					queryKey: ['categories']
				})
				.then(() => console.log('Categories updated!'))
		},
		onError() {
			toast.error('Something went wrong!')
		}
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const data: ICategoryFormState = { title, color }
		mutate(data)
	}

	return { handleSubmit, title, setTitle, color, setColor, colorValues }
}
