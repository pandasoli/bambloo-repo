import type { Activity } from '@/Activity.ts'


const rawFile = `https://raw.githubusercontent.com/${bambloo.repo}/refs/heads/master/${bambloo.path}`

const presence: Activity = {
	assets: {
		large_image: `${rawFile}/discord-icon.png`
	},
	timestamps: { start: Date.now() },
	buttons: [ {label: 'Search it too', url: window.location.href} ]
}

bambloo.onMessage(msg => {
	if (msg.type !== 'start') return

	const params = new URLSearchParams(window.location.search)

	const details = () =>
		params.get('q')
			? `Searching for ${params.get('q')}`
			: 'In the home page'

	const state = () =>
		params.get('iaxm') === 'maps' ?
			'Looking for places in the map'
		: params.get('ia') && params.get('ia') !== 'web' ?
			`Looking for ${params.get('ia')}`
		: 'Looking for a good link'

	presence.state = state()
	presence.details = details()

	bambloo.update(presence)
})
