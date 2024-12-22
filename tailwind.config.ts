import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		screens: {
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px'
		},
		extend: {
			colors: {
				background: 'var(--background)',
				text: 'var(--text)',
				'sidebar-background': 'var(--sidebar-background)',
				'button-background': 'var(--button-background)',
				'button-background-disabled': 'var(--button-background-disabled)',
				gray: 'var(--gray)',
				border: 'var(--border)',
				placeholder: 'var(--placeholder)',
				'blush-pink': 'var(--blush-pink)',
				'coral-red': 'var(--coral-red)',
				'amber-gold': 'var(--amber-gold)',
				'ocean-blue': 'var(--ocean-blue)',
				'emerald-green': 'var(--emerald-green)',
				'sapphire-blue': 'var(--sapphire-blue)',
				'lavender-purple': 'var(--lavender-purple)',
				'sanset-orange': 'var(--sanset-orange)',
				'mint-green': 'var(--mint-green)',
				'crimson-red': 'var(--crimson-red)',
				'steel-gray': 'var(--steel-gray)',
				'slate-blue': 'var(--slate-blue)',
				rosewood: 'var(--rosewood)',
				'ivory-white': 'var(--ivory-white)',
				'chocolate-brown': 'var(--chocolate-brown)',
				'forest-green': 'var(--forest-green)',
				'sky-blue': 'var(--sky-blue)',
				'golden-yellow': 'var(--golden-yellow)',
				'midnight-black': 'var(--midnight-black)',
				'peach-pink': 'var(--peach-pink)',
				low: 'var(--low)',
				medium: 'var(--medium)',
				high: 'var(--high)',
				hover: 'var(--hover)'
			}
		}
	},
	plugins: []
} satisfies Config
