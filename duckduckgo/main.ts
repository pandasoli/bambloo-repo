import type { Activity } from '../Activity.ts'


declare const update: (presence: Activity) => void
declare const log: (data: any) => void


const presence: Activity = {
	assets: {
		large_image: 'https://logodix.com/logo/48308.png'
	},
	timestamps: { start: Date.now() },
	buttons: [ {label: 'Search it too', url: window.location.href} ]
}

window.addEventListener('message', e => {
	const data = (e as any).detail

	if (data.type !== 'start') return

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

	update(presence)
})
